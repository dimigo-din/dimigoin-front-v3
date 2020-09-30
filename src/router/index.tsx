import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import PrivateRoute from '../components/PrivateRoute';

import { Main } from "../pages";
import Auth from "./Auth";
import Ingangsil from "../pages/Ingangsil";
import Outgo from "../pages/Outgo";

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/ingangsil" component={Ingangsil} />
      <Route path="/outgo" component={Outgo} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Router;
