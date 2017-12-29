// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
require('babel-register')
var React = require('react')
var ReactDOMServer = require('react-dom/server');

// Consts
const PLUGIN_NAME = 'gulp-render-static-page';

// Plugin level function(dealing with files)
function gulpRenderStaticPage(opts = {}) {

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }

    let component = require(file.path).default;
    let html = ReactDOMServer.renderToStaticMarkup(React.createElement(component), {}, null);

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

}

// Exporting the plugin main function
module.exports = gulpRenderStaticPage;
