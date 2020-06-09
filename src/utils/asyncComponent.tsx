
import React from 'react';
import loadable from '@loadable/component';

import { ErrorBoundary, Fallback } from "../components";

export default (component: string) => {
  const Component = loadable(() => import(component), { fallback: <Fallback /> });

  return (props) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};