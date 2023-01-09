import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import 'regenerator-runtime/runtime';

import createEmotionCache from '@/utility/createEmotionCache';
import ThemeProvider from '@/styles/theme';
import '@/styles/globals.css';
import MainLayout from '@/components/Layout/MainLayout';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
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
