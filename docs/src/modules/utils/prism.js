import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-jsx';

/* eslint-disable import/no-webpack-loader-syntax */
import lightTheme from 'prismjs/themes/prism.css';
/* eslint-enable import/no-webpack-loader-syntax */

export { lightTheme };

let styleNode;

if (process.browser) {
  styleNode = document.createElement('style');
  styleNode.setAttribute('data-prism', 'true');
  if (document.head) {
    document.head.appendChild(styleNode);
  }
}

export function setPrismTheme(theme: string) {
  styleNode.textContent = theme;
}

export default prism;
