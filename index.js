var through = require('through2');
require('babel-register')
var React = require('react')
var ReactDOMServer = require('react-dom/server');

function gulpRenderStaticPage(opts = {}) {

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

module.exports = gulpRenderStaticPage;
