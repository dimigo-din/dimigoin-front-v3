import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";

import { Main } from "../pages";
import Ingangsil from "../pages/Ingangsil";
import Outgo from "../pages/Outgo";
import Notices from "../pages/Notices";
import SelfStudyDisplay from "../pages/SelfStudyDisplay";
import Council from "../pages/Council";
import Mentoring from "../pages/Mentoring";
import { LoadableComponent } from "@loadable/component";
import { getAccessToken, getRefreshToken, loginWithRefreshToken } from "../api";
import styled from "@emotion/styled";
import Login from "../pages/Login";

const needAuth = (Component: LoadableComponent<{}>) => {
  return (params => {
    try {
      const accessToken = getAccessToken()
      if (!accessToken) throw new Error("Cannot find access token")

      const refreshToken = getRefreshToken()
      if (!refreshToken || !loginWithRefreshToken(refreshToken)) throw new Error("Cannot login with refresh token")

      return <Component {...params} />
    } catch {
      return <Redirect to="/auth/login" />
    }
  }) as React.FC
}

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Container>
        <TopLine />
        <Route path="/ingangsil" component={Ingangsil} />
        <Route path="/outgo" component={Outgo} />
        <Route path="/notices/:articleId" component={Notices} />
        <Route path="/notices" component={Notices} />
        <Route path="/selfstudydisplay" component={SelfStudyDisplay} />
        <Route path="/council" component={Council} />
        <Route path="/mentoring" component={Mentoring} />
        <Route path="/" exact component={withRouter(needAuth(Main))} />
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
