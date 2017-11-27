import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/demos.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/DemoSimple.js': {
          js: require('docs/src/pages/demos/DemoSimple').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoSimple'), 'utf8')
`,
        },
        'pages/demos/DemoTabs.js': {
          js: require('docs/src/pages/demos/DemoTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoTabs'), 'utf8')
`,
        },
        'pages/demos/DemoScroll.js': {
          js: require('docs/src/pages/demos/DemoScroll').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoScroll'), 'utf8')
`,
        },
        'pages/demos/DemoAnimateHeight.js': {
          js: require('docs/src/pages/demos/DemoAnimateHeight').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoAnimateHeight'), 'utf8')
`,
        },
        'pages/demos/DemoResitance.js': {
          js: require('docs/src/pages/demos/DemoResitance').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoResitance'), 'utf8')
`,
        },
        'pages/demos/DemoNested.js': {
          js: require('docs/src/pages/demos/DemoNested').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoNested'), 'utf8')
`,
        },
        'pages/demos/DemoAutoPlay.js': {
          js: require('docs/src/pages/demos/DemoAutoPlay').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoAutoPlay'), 'utf8')
`,
        },
        'pages/demos/DemoAxis.js': {
          js: require('docs/src/pages/demos/DemoAxis').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoAxis'), 'utf8')
`,
        },
        'pages/demos/DemoKeyboard.js': {
          js: require('docs/src/pages/demos/DemoKeyboard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoKeyboard'), 'utf8')
`,
        },
        'pages/demos/DemoVirtualize.js': {
          js: require('docs/src/pages/demos/DemoVirtualize').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoVirtualize'), 'utf8')
`,
        },
        'pages/demos/DemoHocs.js': {
          js: require('docs/src/pages/demos/DemoHocs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoHocs'), 'utf8')
`,
        },
        'pages/demos/DemoWidth.js': {
          js: require('docs/src/pages/demos/DemoWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoWidth'), 'utf8')
`,
        },
        'pages/demos/DemoRtl.js': {
          js: require('docs/src/pages/demos/DemoRtl').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoRtl'), 'utf8')
`,
        },
        'pages/demos/DemoCircular.js': {
          js: require('docs/src/pages/demos/DemoCircular').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoCircular'), 'utf8')
`,
        },
        'pages/demos/DemoCoverflow.js': {
          js: require('docs/src/pages/demos/DemoCoverflow').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/DemoCoverflow'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
