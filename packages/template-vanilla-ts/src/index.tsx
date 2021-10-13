/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App name='tom' age={25} />, document.querySelector('#root'));
