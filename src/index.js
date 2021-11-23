import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import todoStore from './store/todoStore';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={todoStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
