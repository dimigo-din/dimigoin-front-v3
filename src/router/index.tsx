import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect, withRouter, HashRouter } from "react-router-dom";

import { Main, Notices } from "../pages";
import Ingangsil from "../pages/Ingangsil";
import Outgo from "../pages/Outgo";
import SelfStudyDisplay from "../pages/SelfStudyDisplay";
import Mentoring from "../pages/Mentoring";
import { LoadableComponent } from "@loadable/component";
import { getAccessToken, getRefreshToken, loginWithRefreshToken } from "../api";
import styled from "@emotion/styled";
import Login from "../pages/Login";

const needAuth = <T extends {}>(Component: LoadableComponent<T>) => {
  return (params: T) => {
    try {
      const accessToken = getAccessToken()
      if (!accessToken) throw new Error("Cannot find access token")

      const refreshToken = getRefreshToken()
      if (!refreshToken || !loginWithRefreshToken(refreshToken)) throw new Error("Cannot login with refresh token")

      return <Component {...params} />
    } catch {
      return <Redirect to="/auth/login" />
    }
  }
}

const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Container>
        <TopLine />
        <Route path="/ingangsil" component={Ingangsil} />
        <Route path="/outgo" component={Outgo} />
        <Route path="/notices/:articleId" component={needAuth(Notices)} />
        <Route path="/notices" exact component={needAuth(Notices)} />
        <Route path="/selfstudydisplay" component={SelfStudyDisplay} />
        <Route path="/mentoring" component={Mentoring} />
        <Route path="/" exact component={needAuth(Main)} />
      </Container>
    </Switch>
  </HashRouter>
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
