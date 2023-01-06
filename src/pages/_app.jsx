import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

import createEmotionCache from '@/utility/createEmotionCache';
import darkTheme from '@/styles/theme/darkTheme';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {getLayout(
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>,
          )}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
