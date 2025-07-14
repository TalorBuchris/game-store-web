import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store.js"
import { BrowserRouter } from 'react-router-dom'
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';

import * as React from 'react';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const themeColor = createTheme({
  palette: {
    primary: {
      main: '#008094',
      light: '#3399a9',
      dark: '#3399a9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3399a9',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={themeColor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </StrictMode>,
)
