import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Github from '@material-ui/docs/svgIcons/GitHub';
import NProgressBar from '@material-ui/docs/NProgressBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import { pageToTitle } from 'docs/src/modules/utils/helpers';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { children, classes } = this.props;
    const title =
      this.context.activePage.title !== false ? pageToTitle(this.context.activePage) : null;

    let disablePermanent = false;
    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName = classes.navIconHide;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.root}>
        <NProgressBar />
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={navIconClassName}
            >
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography className={classes.title} variant="title" color="inherit" noWrap>
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
            <IconButton
              component="a"
              title="GitHub"
              color="inherit"
              href="https://github.com/oliviertassinari/react-swipeable-views"
            >
              <Github />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onClose={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
        />
        {children}
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

AppFrame.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default withStyles(styles, {
  name: 'AppFrame',
})(AppFrame);
