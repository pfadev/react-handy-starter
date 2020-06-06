import React from 'react';
import ReactDOM from 'react-dom';

module.hot ? ReactDOM.render : ReactDOM.hydrate(
  <div>
    Hello World!
  </div>,
  document.getElementById('react-view')
);
