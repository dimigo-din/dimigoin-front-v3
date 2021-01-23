import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Login } from '../pages';

export default withRouter(({ match }) => (
  <>
    <Route path={`${match.path}/login`} component={Login} />
  </>
));
