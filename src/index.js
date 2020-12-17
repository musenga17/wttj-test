import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, WuiProvider } from '@welcome-ui/core';

const options = {
  defaultFontFamily: 'Helvetica',
  headingFontFamily: 'Georgia',
  colors: {
    primary: {
      500: '#FF0000'
    },
    secondary: {
      500: '#00FF00'
    }
  }
};

const theme = createTheme(options);

ReactDOM.render(
  <WuiProvider
    theme={theme}
    hasGlobalStyle
    useReset
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WuiProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
