import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { ReactComponent as _BrandWithText } from "../assets/brand-with-text.svg";
import { Button, Input, ResponsiveWrapper, TodayMeal } from "../components";
import css from "@emotion/css";
import { useMeal } from "../hooks/api";
import useInput from "../hooks/useInput";

const SMALL_SCREEN_THRESHOLD = 840

const Login: React.FC = () => {
  const todayMeal = useMeal()
  const usernameInput = useInput()
  const passwordInput = useInput()
  const login = useCallback(() => {
    console.log(usernameInput.value, passwordInput.value)
  }, [usernameInput.value, passwordInput.value])
  return <Wrapper>
    <SameHeightHorizontal threshold={SMALL_SCREEN_THRESHOLD}>
      <InputContainer>
        <BrandWithText />
        <Input css={ css`margin-top: 36px;` } placeholder="아이디" {...usernameInput} />
        <Input css={ css`margin-top: 12px;` } type="password" placeholder="비밀번호" {...passwordInput} />
        <LoginButton onClick={login}>
          로그인
        </LoginButton>
      </InputContainer>
      <MealDisplay meals={todayMeal} />
    </SameHeightHorizontal>
  </Wrapper>
}

export default Login

const BrandWithText = styled(_BrandWithText)`
  width: 216px;
  height: 60px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 160px;
  }
`

const Wrapper = styled.div`
  height: 100vh;
  border-top: 12px solid var(--main-theme-accent);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-height: 720px) {
    align-items: flex-start;
  }
`

const SameHeightHorizontal = styled(ResponsiveWrapper)`
  display: flex;
  align-items: stretch;
  flex: 0.6;
  justify-content: space-between;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    flex: 1;
    padding: 36px 18px;
  }
`

const InputContainer = styled.div`
  flex: 0.4;
  @media screen and (max-width: 1280px) {
    flex: 1;
  }
`

const LoginButton = styled(Button)`
  display: flex;
  margin-top: 48px;
`

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
`