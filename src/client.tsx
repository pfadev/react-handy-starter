import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';

const hot = (module as any).hot;

const render = (routes: Array<any>) => (
  (hot ? ReactDOM.hydrate : ReactDOM.render)(
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>,
    document.getElementById('react-view')
  )
);

loadableReady(() => render(require('./routes').default));

if (hot) {
  hot.accept('./routes', () => {
    try {
      render(require('./routes').default);
    } catch (error) {
      console.error(` Routes hot reloading error ${error}`);
    }
  });
}
