import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Main } from "../pages";
import Auth from "./Auth";
import Ingangsil from "../pages/Ingangsil";
import Outgo from "../pages/Outgo";
import Notices from "../pages/Notices";
import Council from "../pages/Council";
import Mentoring from "../pages/Mentoring";

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/ingangsil" component={Ingangsil} />
      <Route path="/outgo" component={Outgo} />
      <Route path="/notices/:articleId" component={Notices} />
      <Route path="/notices" component={Notices} />
      <Route path="/council" component={Council} />
      <Route path="/mentoring" component={Mentoring} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Router;
