import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import warning from 'warning';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import {
  getHeaders,
  getContents,
  getTitle,
  getDescription,
} from 'docs/src/modules/utils/parseMarkdown';

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
  },
});

const demoRegexp = /^"demo": "(.*)"/;
const SOURCE_CODE_ROOT_URL =
  'https://github.com/oliviertassinari/react-swipeable-views/tree/master/';

function MarkdownDocs(props, context) {
  const { classes, demos, disableAd, markdown, markdownLocation: markdownLocationProp } = props;
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  let markdownLocation = markdownLocationProp || context.activePage.pathname;

  if (!markdownLocationProp) {
    const token = markdownLocation.split('/');
    token.push(token[token.length - 1]);
    markdownLocation = token.join('/');

    if (headers.filename) {
      markdownLocation = headers.filename;
    } else {
      markdownLocation = `/docs/src/pages${markdownLocation}.md`;
    }
  }

  if (headers.components.length > 0) {
    const section = markdownLocation.split('/')[4];
    contents.push(`
## API

${headers.components
      .map(
        component =>
          `- [&lt;${component} /&gt;](${section === 'lab' ? '/lab/api' : '/api'}/${kebabCase(
            component,
          )})`,
      )
      .join('\n')}
        `);
  }

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdown)} - react-swipeable-views`}
        description={getDescription(markdown)}
      />
      <AppTableOfContents contents={contents} disableAd={disableAd} />
      <AppContent className={classes.root}>
        <div className={classes.header}>
          <Button component="a" href={`${SOURCE_CODE_ROOT_URL}${markdownLocation}`}>
            {'Edit this page'}
          </Button>
        </div>
        {contents.map((content, index) => {
          const match = content.match(demoRegexp);

          if (match && demos) {
            const demoOptions = JSON.parse(`{${content}}`);

            const name = demoOptions.demo;
            warning(demos && demos[name], `Missing demo: ${name}.`);
            return (
              <Demo
                key={content}
                js={demos[name].js}
                raw={demos[name].raw}
                index={index}
                demoOptions={demoOptions}
                githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
              />
            );
          }

          return (
            <MarkdownElement className={classes.markdownElement} key={content} text={content} />
          );
        })}
      </AppContent>
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  markdown: PropTypes.string.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
};

MarkdownDocs.defaultProps = {
  disableAd: false,
};

MarkdownDocs.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MarkdownDocs);
