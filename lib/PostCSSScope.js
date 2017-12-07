'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-scope', options => root => {
  root.each(function rewriteSelector(node) {

    if (!node.selector) {
      // handle media queries
      if (node.type === 'atrule' && node.name === 'media') {
        node.each(rewriteSelector);
      }
      return;
    }

    node.selector = (0, _postcssSelectorParser2.default)(selectors => {
      selectors.each(selector => {
        let node = null;

        selector.each(n => {
          if (n.type !== 'pseudo') {
            node = n;
          }
        });

        if (node) {
          selector.insertAfter(node, _postcssSelectorParser2.default.attribute({ attribute: options.scopeId }));
        }
      });
    }).process(node.selector).result;
  });
});