import React from 'react';
import PropTypes from 'prop-types';
import LZString from 'lz-string';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import CodeIcon from 'material-ui-icons/Code';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  demo: {
    ...theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    }),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 6,
    },
  },
  codeButton: {
    flip: false,
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    top: 2,
    right: 7,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
  codesandbox: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      flip: false,
      zIndex: 10,
      position: 'absolute',
      top: 2,
      right: 48,
    },
  },
});

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

class Demo extends React.Component {
  state = {
    codeOpen: false,
  };

  codesandboxForm = null;

  handleClickCodeOpen = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  handleClickCodesandbox = () => {
    const codesandboxValue = {
      files: {
        'package.json': {
          content: {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              'react-swipeable-views': 'latest',
              'react-swipeable-views-utils': 'latest',
            },
          },
        },
        'demo.js': {
          content: this.props.raw,
        },
        'index.js': {
          content: `
import React from 'react';
import { render } from 'react-dom';
import Demo from './demo';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
          `,
        },
        'index.html': {
          content: `
<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <div id="root"></div>
</body>
            `,
        },
      },
    };

    this.codesandboxForm.querySelector('[name="parameters"]').value = compress(codesandboxValue);
    this.codesandboxForm.submit();
  };

  render() {
    const { classes, js: DemoComponent, raw } = this.props;
    const { codeOpen } = this.state;

    return (
      <div className={classes.root}>
        <Tooltip title="Edit in codesandbox" placement="top">
          <div className={classes.codesandbox}>
            <IconButton onClick={this.handleClickCodesandbox}>
              <ModeEditIcon />
            </IconButton>
            <form
              ref={node => {
                this.codesandboxForm = node;
              }}
              method="get"
              action="https://codesandbox.io/api/v1/sandboxes/define"
              target="_blank"
            >
              <input type="hidden" name="parameters" value="" />
            </form>
          </div>
        </Tooltip>
        <Tooltip title={codeOpen ? 'Hide the source' : 'Show the source'} placement="top">
          <IconButton onClick={this.handleClickCodeOpen} className={classes.codeButton}>
            <CodeIcon />
          </IconButton>
        </Tooltip>
        <Collapse in={codeOpen} unmountOnExit>
          <MarkdownElement dir="ltr" className={classes.code} text={`\`\`\`js\n${raw}\n\`\`\``} />
        </Collapse>
        <div className={classes.demo}>
          <DemoComponent />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  js: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
