import React, { useRef, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as IconLogo } from '../../../assets/brand.svg';
import { ReactComponent as LogoutLogo } from '../../../assets/icons/logout.svg';

import NavigationItem from './NavigationItem';
import { studentNavigations, teacherNavigations } from './navigations';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UnstyledLink } from '../../basic/Atomics';
import { useMyData } from '../../../hooks/api/useMyData';
import { SLACK_API_ENDPOINT, SMALL_SCREEN_THRESHOLD } from '../../../constants';
import css from '@emotion/css';
import { BottomBar } from './NavigationItem.style';
import { isStudent } from '../../../utils/isStudent';
import { showModal } from '../modal';
import { Card } from '../../basic';

const TopNavbar: React.FC<RouteComponentProps> = ({ history }) => {
  const [count, setCount] = useState(0);

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

  const counter = useCallback(() => {
    console.log(count);
    if (count === 5) {
      fetch('https://cors.bridged.cc/' + SLACK_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"text":"somebody found easteregg1 !"}`,
      });
      alert('You just found Easter Egg!');
    } else if (count === 30) {
      if (!SLACK_API_ENDPOINT) return;
      fetch('https://cors.bridged.cc/' + SLACK_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"text":"${myLocalData?.idx} FOUND EASTEREGG2 !"}`,
      });
      showModal(() => (
        <Card>
          제법인데요? 프론트엔드 개발자가 당신을 사랑합니다{' '}
          <span role="img" aria-label="웃는 얼굴">
            😊😊
          </span>
          이 이스터에그는 당신이 확인했기 때문에 사라질 예정입니다. 당신은 이
          이스터에그를 발견한 단 한사람이에요. 힘든 디미고에서 행운을 빌어요!
          뭐든지 잘 해낼 수 있을거에요. 당신은 지금도 잘 해내고 있으니까요!
        </Card>
      ));
    }
    setCount((c) => c + 1);
  }, [setCount, count, myLocalData]);

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
              selected={history.location.pathname === route}
              route={route}
              onLinkClicked={scrollToClicked}
            />
          ))}
        </Scroller>
        <ProfileContainer>
          <ProfileImage onClick={() => counter()} src={profileImageURI} />
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
