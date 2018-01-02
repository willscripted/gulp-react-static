var through = require('through2');
var React = require.main.require('react')
var ReactDOMServer = require.main.require('react-dom/server');
var webpack = require('webpack');
var MemoryFS = require('memory-fs');

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getWebpackConfig(filePath) {
  const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
  });

  return {
    entry: [
      filePath
    ],
    output: {
      path: '/',
      filename: "index.js",
      libraryTarget: "umd",
      library: "Bundle",
      publicPath: '/'
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'react']
        }
      }
      ]
    },
    target: "node",
    plugins: [
      extractSass
    ]
  }
}

function gulpRenderStaticPage(opts = {}) {

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    const fs = new MemoryFS();
    const compiler = webpack(getWebpackConfig(file.path));

    compiler.outputFileSystem = fs;
    compiler.run((err, stats) => {
      const js = fs.readFileSync('/index.js', "utf8");
      const mod = new module.constructor;
      mod._compile(js, './page.js');
      let component = mod.exports.default;

      let styles = fs.readFileSync('/styles.css', "utf8");
      let html = "<!DOCTYPE html>"
        + ReactDOMServer.renderToStaticMarkup(React.createElement(component), {}, null);
      html = html.replace(/\{\{\{ +REACT_STATIC_STYLES +\}\}\}/, styles);

      if (file.isBuffer()) {
        file.contents = Buffer.from(html, 'utf8');
      }

      if (file.isStream()) {
        var stream = through();
        stream.write(html);
        file.contents = stream;
      }

      cb(null, file);
    });
  });

}

module.exports = gulpRenderStaticPage;
