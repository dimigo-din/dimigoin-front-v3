import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

import Auth from './Auth';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
    </Switch>
  </BrowserRouter>
);

export default Router;
