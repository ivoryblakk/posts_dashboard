import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import ErrorBoundary from './ErrorBoundary'

ReactDOM.render(
  <React.StrictMode >
      <Provider  store={store}>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

