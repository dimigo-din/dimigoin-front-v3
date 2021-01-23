import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Main } from "../pages";
import Auth from "./Auth";
import Ingangsil from "../pages/Ingangsil";
import Outgo from "../pages/Outgo";
import Notices from "../pages/Notices";
import SelfStudyDisplay from "../pages/SelfStudyDisplay";
import Council from "../pages/Council";
import Mentoring from "../pages/Mentoring";
import { LoadableComponent } from "@loadable/component";
import { getToken } from "../api";
import styled from "@emotion/styled";

const needAuth = (Component: LoadableComponent<{}>) => {
  return (params => {
    if(!getToken()) 
      return <Redirect to="/auth/login" />
    return <Component {...params} />
  }) as React.FC
}

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Container>
        <TopLine />
        <Route path="/ingangsil" component={Ingangsil} />
        <Route path="/outgo" component={Outgo} />
        <Route path="/notices/:articleId" component={Notices} />
        <Route path="/notices" component={Notices} />
        <Route path="/selfstudydisplay" component={SelfStudyDisplay} />
        <Route path="/council" component={Council} />
        <Route path="/mentoring" component={Mentoring} />
        <Route path="/" exact component={needAuth(Main)} />
      </Container>
    </Switch>
  </BrowserRouter>
);

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const TopLine = styled.div`
  width: 100%;
  height: 12px;
  background-color: var(--main-theme-accent);
`;


export default Router;
