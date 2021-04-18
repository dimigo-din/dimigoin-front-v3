import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { Cherryblossom } from 'react-cherryblossom';

import { useMeal } from '../hooks/api';
import { useTextInput } from '../hooks/useInput';
import { clearTokens, loginWithInfo } from '../api';
import { SMALL_SCREEN_THRESHOLD } from '../constants';
import { ReactComponent as _BrandWithText } from '../assets/brand-with-text.svg';
import { Button, Input, ResponsiveWrapper, TodayMeal } from '../components';

const Login: React.FC = () => {
  const todayMeal = useMeal();
  const [usernameInput, setUsernameError] = useTextInput();
  const [passwordInput, setPasswordError] = useTextInput();
  const history = useHistory();
  useEffect(() => clearTokens(), []);
  const login = useCallback(async () => {
    if (!usernameInput.value)
      setUsernameError('올바른 사용자 이름을 입력해주세요');
    if (!passwordInput.value)
      setPasswordError('올바른 비밀번호를 입력해주세요');
    if (!usernameInput.value || !passwordInput.value) return;

    if (
      await loginWithInfo({
        username: usernameInput.value,
        password: passwordInput.value,
      })
    ) {
      history.push('/');
    } else {
      toast.error('사용자 이름 또는 비밀번호를 확인해주세요.');
    }
  }, [
    usernameInput.value,
    passwordInput.value,
    setPasswordError,
    setUsernameError,
    history,
  ]);
  const enterToSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') login();
    },
    [login],
  );
  return (
    <Wrapper>
      <BlossomContainer>
        <BlossomBackground amount={30} />
      </BlossomContainer>

      <SameHeightHorizontal threshold={SMALL_SCREEN_THRESHOLD}>
        <InputContainer>
          <BrandWithText />
          <Input
            css={css`
              margin-top: 36px;
            `}
            placeholder="아이디"
            {...usernameInput}
            onKeyPress={enterToSubmit}
          />
          <Input
            css={css`
              margin-top: 12px;
            `}
            type="password"
            placeholder="비밀번호"
            {...passwordInput}
            onKeyPress={enterToSubmit}
          />
          <LoginButton onClick={login}>로그인</LoginButton>
        </InputContainer>
        <MealDisplay meals={todayMeal} />
      </SameHeightHorizontal>
    </Wrapper>
  );
};

export default Login;

const BrandWithText = styled(_BrandWithText)`
  width: 216px;
  height: 60px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 120px;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  border-top: 12px solid var(--main-theme-accent);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-height: 720px) {
    padding: 40px 0px;
    /* align-items: flex-start; */
    flex-wrap: wrap;
  }
`;

const SameHeightHorizontal = styled(ResponsiveWrapper)`
  display: flex;
  align-items: stretch;
  flex: 0.6;
  justify-content: space-between;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    flex: 1;
    padding: 36px 18px;
  }
`;

const InputContainer = styled.div`
  flex: 0.4;
  @media screen and (max-width: 1280px) {
    flex: 1;
  }
`;

const LoginButton = styled(Button)`
  display: flex;
  margin-top: 48px;
`;

const MealDisplay = styled(TodayMeal)`
  flex: 0.5;
  margin-left: 24px;
  @media screen and (max-width: 1280px) {
    flex: 1;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    margin-left: 0px;
    margin-top: 24px;
  }
`;

const BlossomContainer = styled.div`
  opacity: 0.2;
  z-index: -10;
`;

const BlossomBackground = styled(Cherryblossom)``;
