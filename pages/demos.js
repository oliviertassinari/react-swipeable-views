import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/DemoSimple.js': {
          js: require('docs/src/pages/DemoSimple').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoSimple'), 'utf8')
`,
        },
        'pages/DemoTabs.js': {
          js: require('docs/src/pages/DemoTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoTabs'), 'utf8')
`,
        },
        'pages/DemoScroll.js': {
          js: require('docs/src/pages/DemoScroll').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoScroll'), 'utf8')
`,
        },
        'pages/DemoAnimateHeight.js': {
          js: require('docs/src/pages/DemoAnimateHeight').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoAnimateHeight'), 'utf8')
`,
        },
        'pages/DemoResitance.js': {
          js: require('docs/src/pages/DemoResitance').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoResitance'), 'utf8')
`,
        },
        'pages/DemoNested.js': {
          js: require('docs/src/pages/DemoNested').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoNested'), 'utf8')
`,
        },
        'pages/DemoAutoPlay.js': {
          js: require('docs/src/pages/DemoAutoPlay').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoAutoPlay'), 'utf8')
`,
        },
        'pages/DemoAxis.js': {
          js: require('docs/src/pages/DemoAxis').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoAxis'), 'utf8')
`,
        },
        'pages/DemoKeyboard.js': {
          js: require('docs/src/pages/DemoKeyboard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoKeyboard'), 'utf8')
`,
        },
        'pages/DemoVirtualize.js': {
          js: require('docs/src/pages/DemoVirtualize').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoVirtualize'), 'utf8')
`,
        },
        'pages/DemoHocs.js': {
          js: require('docs/src/pages/DemoHocs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoHocs'), 'utf8')
`,
        },
        'pages/DemoWidth.js': {
          js: require('docs/src/pages/DemoWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoWidth'), 'utf8')
`,
        },
        'pages/DemoRtl.js': {
          js: require('docs/src/pages/DemoRtl').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/DemoRtl'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
