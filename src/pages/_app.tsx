import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import AuthProvider from '@/components/Auth';
import Header from '@/components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles &&
      jssStyles.parentElement &&
      jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <StylesProvider injectFirst>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </StylesProvider>
    </React.Fragment>
  );
};

export default App;
