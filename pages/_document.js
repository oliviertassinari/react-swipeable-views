import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import CleanCSS from 'clean-css';
import getContext from 'docs/src/modules/styles/getContext';

const cleanCSS = new CleanCSS();
const title = 'react-swipeable-views';
const description = 'A React component for swipeable views.';

class MyDocument extends Document {
  render() {
    const { stylesContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta name="theme-color" content={stylesContext.theme.palette.primary[500]} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <style id="insertion-point-jss" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {/* Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context to collected side effects.
  const context = getContext();
  const page = ctx.renderPage(Component => props => (
    <Component sheetsRegistry={context.sheetsRegistry} {...props} />
  ));

  let css = context.sheetsRegistry.toString();
  if (process.env.NODE_ENV === 'production') {
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...page,
    stylesContext: context,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ),
  };
};

export default MyDocument;
