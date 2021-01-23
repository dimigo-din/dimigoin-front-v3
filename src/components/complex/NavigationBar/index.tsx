import React, { useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { ReactComponent as IconLogo } from '../../../assets/brand.svg'
import { ReactComponent as LogoutLogo } from '../../../assets/icons/logout.svg'

import NavigationItem from "./NavigationItem";
import navigations from "./navigations";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { UnstyledLink } from "../../basic/Atomics";

const TopNavbar: React.FC<RouteComponentProps> = ({ history }) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollToClicked = useCallback(
    (offset: number) => {
      if (scrollerRef.current)
        scrollerRef.current.scrollTo({
          left: offset,
          behavior: 'smooth'
        })
    },
    [scrollerRef],
  )
  return (
    <Wrapper>
      <Container>
        <UnstyledLink to="/">
          <IconLogo height={37} width={32} />
        </UnstyledLink>
        <Scroller ref={scrollerRef}>
          {navigations.map(({ title, image, route }) =>
            <NavigationItem
              key={`${route}${title}`}
              title={title}
              image={image}
              selected={history.location.pathname === route}
              route={route}
              onLinkClicked={scrollToClicked}
            />
          )}
        </Scroller>
        <ProfileContainer>
          <ProfileImage />
          <LogoutLogo height={26.5} width={26.5} />
        </ProfileContainer>
      </Container>
    </Wrapper>
  );
};

export const NavigationBar = withRouter(TopNavbar);
export default NavigationBar

const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
  background-color: #ffffff;
  display: flex;
`;

const Container = styled.div`
  max-width: 1560px;
  width: 90%;
  margin: 0px auto;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: 20px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: solid 2px var(--main-theme-accent);
  margin-right: 38.2px;
`;

const Scroller = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
`