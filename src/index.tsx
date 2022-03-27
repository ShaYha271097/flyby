import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './components/theme/store'
import { Provider } from 'react-redux'


ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>, document.getElementById('root'));
serviceWorkerRegistration.register()
