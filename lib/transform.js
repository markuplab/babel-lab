var Babel = require('babel-core');
var path = require('path');

var internals = {};
internals.transform = function transform (content, filename) {
  if (/^node_modules/.test(filename)) {
    return content;
  }

  var babelrc = path.join(process.cwd(), '.babelrc');
  var transformed = Babel.transform(content, {
    sourceMap: 'inline',
    sourceFileName: filename,
    auxiliaryCommentBefore: '$lab:coverage:off$',
    auxiliaryCommentAfter: '$lab:coverage:on$',
    babelrc: babelrc
  });

  return transformed.code;
};

internals.extensions = ['js', 'jsx', 'es', 'es6'];
internals.methods = [];

for (var i = 0, il = internals.extensions.length; i < il; ++i) {
  internals.methods.push({
    ext: internals.extensions[i],
    transform: internals.transform
  });
}

module.exports = internals.methods;
