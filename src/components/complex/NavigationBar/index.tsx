import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import NavigationItem from './NavigationItem';
import { studentNavigations, teacherNavigations } from './navigations';
import { MoreCompactButton, UnstyledLink } from '../../basic/Atomics';
import { useMyData } from '../../../hooks/api/useMyData';
import { SMALL_SCREEN_THRESHOLD } from '../../../constants';
import { BottomBar } from './NavigationItem.style';
import { isStudent } from '../../../utils/isStudent';

import { ReactComponent as IconLogo } from '../../../assets/brand.svg';
import { ReactComponent as LogoutLogo } from '../../../assets/icons/logout.svg';
import { showCardModal } from '../modal';
import { CardGroupHeader } from '../../basic';
import { toast } from 'react-toastify';

const openConfig = () => {
  showCardModal(() => (
    <>
      <CardGroupHeader>설정</CardGroupHeader>
      <ConfigGroupHeader>임시파일</ConfigGroupHeader>
      <MoreCompactButton
        onClick={() => {
          localStorage.clear();
          toast.success('임시 파일을 삭제했어요');
        }}
      >
        임시 파일 삭제
      </MoreCompactButton>
    </>
  ));
};

const ConfigGroupHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const TopNavbar: React.FC<RouteComponentProps> = ({ history }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollToClicked = useCallback(
    (offset: number) => {
      if (scrollerRef.current)
        scrollerRef.current.scrollTo({
          left: offset,
          behavior: 'smooth',
        });
    },
    [scrollerRef],
  );
  const myLocalData = useMyData();
  const profileImageURI = myLocalData
    ? myLocalData.photos.slice(-1)[0]
    : undefined;

  return (
    <Wrapper>
      <Container>
        <UnstyledLink to="/">
          <LogoWrapper>
            <Logo
              height={37}
              width={32}
              selected={history.location.pathname === '/'}
            />
            {history.location.pathname === '/' && <BottomBar bottom={-24} />}
          </LogoWrapper>
        </UnstyledLink>
        <Scroller ref={scrollerRef}>
          {(myLocalData && isStudent(myLocalData)
            ? studentNavigations
            : teacherNavigations
          ).map(({ title, image, route }) => (
            <NavigationItem
              key={`${route}${title}`}
              title={title}
              image={image}
              selected={history.location.pathname.startsWith(route)}
              route={route}
              onLinkClicked={scrollToClicked}
            />
          ))}
        </Scroller>
        <ProfileContainer>
          <ProfileImage src={profileImageURI} onClick={openConfig} />
          <UnstyledLink to="/auth/login">
            <Logout height={26.5} width={26.5} />
          </UnstyledLink>
        </ProfileContainer>
      </Container>
    </Wrapper>
  );
};

export const NavigationBar = withRouter(TopNavbar);
export default NavigationBar;

const LogoWrapper = styled.span`
  position: relative;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    --bottom-margin: -9px;
  }
`;

const Logo = styled(IconLogo)<{ selected?: boolean }>`
  fill: #d1d1d1;

  ${({ selected }) =>
    selected &&
    css`
      fill: var(--main-theme-accent);
    `}
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 24px;
  }
`;

const Logout = styled(LogoutLogo)`
  height: 26px;
  width: 26px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 18px;
    height: 18px;
  }
`;

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
  object-fit: cover;
  cursor: pointer;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 28px;
    height: 28px;
    margin-right: 18px;
  }
`;

const Scroller = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
`;
