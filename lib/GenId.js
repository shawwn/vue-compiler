'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GenId;

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const idCache = Object.create(null);

/**
 * Generate unique id for specific file
 * @param {string} content
 * @return {string} Hash sum for the file path
 */
function GenId(content) {
  if (!idCache[content]) {
    idCache[content] = `data-v-${(0, _hashSum2.default)(content)}`;
  }
  return idCache[content];
}