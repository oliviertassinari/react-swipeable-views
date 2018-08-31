const { JSDOM } = require('jsdom');
const Node = require('jsdom/lib/jsdom/living/node-document-position');

// We can use jsdom-global at some point if maintaining these lists is a burden.
const whitelist = ['HTMLElement', 'Performance'];
const blacklist = ['sessionStorage', 'localStorage'];

function createDOM() {
  const dom = new JSDOM('', { pretendToBeVisual: true });
  global.window = dom.window;
  global.Node = Node;
  global.document = dom.window.document;
  global.navigator = {
    userAgent: 'node.js',
  };

  Object.keys(dom.window)
    .filter(key => !blacklist.includes(key))
    .concat(whitelist)
    .forEach(key => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key];
      }
    });
}

module.exports = createDOM;
