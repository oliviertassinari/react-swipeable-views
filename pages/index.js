// @flow

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Head from 'docs/src/modules/components/Head';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withRoot from 'docs/src/modules/components/withRoot';
import AppFrame from 'docs/src/modules/components/AppFrame';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  hero: {
    minHeight: '100vh', // Makes the hero full height until we get some more content.
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 16,
      paddingBottom: theme.spacing.unit * 16,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    maxWidth: 500,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
});

function PageHome(props) {
  const classes = props.classes;

  return (
    <AppFrame>
      <div className={classes.root}>
        <Head />
        <div className={classes.hero}>
          <div className={classes.content}>
            <div className={classes.text}>
              <Typography
                variant="display2"
                component="h1"
                align="center"
                color="inherit"
                gutterBottom
              >
                {'react-swipeable-views'}
              </Typography>
              <Typography
                variant="headline"
                component="h2"
                color="inherit"
                className={classes.headline}
              >
                {'A React component for swipeable views.'}
              </Typography>
              <Button
                component={linkProps => (
                  <Link
                    {...linkProps}
                    variant="button"
                    prefetch
                    href="/getting-started/installation"
                  />
                )}
                className={classes.button}
                variant="raised"
              >
                {'Get Started'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

PageHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(PageHome);
