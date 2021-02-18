import * as React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { Main, Notices, Ingangsil, Mentoring, Outgo, SelfStudyDisplay } from "../pages";
import { LoadableComponent } from "@loadable/component";
import { getAccessToken, getRefreshToken, loginWithRefreshToken } from "../api";
import styled from "@emotion/styled";
import Login from "../pages/Login";

const needAuth = <PageProps extends {}>(Component: LoadableComponent<PageProps>) => {
  return (params: PageProps) => {
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
        <Route path="/ingangsil" component={needAuth(Ingangsil)} />
        <Route path="/outgo" component={needAuth(Outgo)} />
        <Route path="/notices/:articleId" component={needAuth(Notices)} />
        <Route path="/notices" exact component={needAuth(Notices)} />
        <Route path="/selfstudydisplay" component={needAuth(SelfStudyDisplay)} />
        <Route path="/mentoring" component={needAuth(Mentoring)} />
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
  box-sizing: border-box;
`;

export const TopLine = styled.div`
  width: 100%;
  height: 12px;
  background-color: var(--main-theme-accent);
`;

export default Router;
