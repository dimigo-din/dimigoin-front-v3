import * as React from "react";
import { Switch, Route, Redirect, HashRouter, RouteComponentProps } from "react-router-dom";
import {
  Main, Notices, Ingangsil, Mentoring, Outgo, SelfStudyDisplay,
  IngangsilManager, Afterschool, Circle, Dets
} from "../pages";
import { LoadableComponent } from "@loadable/component";
import { getAccessToken, getRefreshToken, loginWithRefreshToken } from "../api";
import styled from "@emotion/styled";
import Login from "../pages/Login";
import { Permission, User, UserType } from "../constants/types";
import { getMyData } from "../api/user";
import { NavigationBar } from "../components";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

const needAuthAndBranch = <TeacherProps, StudentProps>({
  Teacher,
  Student
}: {
  Teacher: LoadableComponent<TeacherProps>;
  Student: LoadableComponent<StudentProps>;
}): React.FC<StudentProps & TeacherProps> => {
  return function C(props) {
    const [myData, setMyData] = React.useState<User | null>();

    React.useEffect(() => {
      getMyData()
        .then(setMyData)
        .catch(() => setMyData(null))
    }, [])

    console.log(myData)

    if (myData === null) return <Redirect to="/auth/login" />
    if (myData?.userType === UserType.S) return <Student {...props} />
    if (myData?.userType === UserType.T) return <Teacher {...props} />
    return <></>
  }
}

const needPermission = <Props extends {}>(permission: Permission, Page: React.FC<RouteComponentProps<Props>>) => (props: RouteComponentProps<Props>) => {
  const [hasPermission, setHasPermission] = React.useState<boolean>();

  useEffect(() => {
    getMyData()
      .then(d => {
        const _hasPermission = d.permissions.includes(permission)
        if (!_hasPermission)
          toast.info("권한이 없습니다")
        setHasPermission(() => _hasPermission)
      })
      .catch(() => {
        toast.info("로그인이 필요합니다")
        setHasPermission(() => false)
      })
  }, [])

  if (hasPermission === undefined) return <></>
  if (hasPermission)
    return <Page {...props} />
  return <Redirect to="/" />
}


const Router: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/selfstudydisplay" component={needAuth(SelfStudyDisplay)} />
      <Container>
        <TopLine />
        <NavigationBar />
        <Route path="/ingangsil/manager" component={needPermission(Permission["ingang-application"], needAuth(IngangsilManager))} />
        <Route path="/ingangsil" exact component={needAuthAndBranch(Ingangsil)} />
        <Route path="/outgo" component={needAuth(Outgo)} />
        <Route path="/notices/:articleId" component={needAuth(Notices)} />
        <Route path="/notices" exact component={needAuth(Notices)} />
        <Route path="/mentoring" component={needAuthAndBranch(Mentoring)} />
        <Route path="/afterschool" component={needAuthAndBranch(Afterschool)} />
        <Route path="/circle" component={needAuthAndBranch(Circle)} />
        <Route path="/dets" component={needAuth(Dets)} />
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
