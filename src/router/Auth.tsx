import * as React from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../pages';

export default ({ match }: { match: { path: string } }) => (
  <>
    <Route path={`${match.path}/login`} component={Login} />
  </>
);
