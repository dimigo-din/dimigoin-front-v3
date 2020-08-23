import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import css, { SerializedStyles } from "@emotion/css";
import auth from "../utils/auth";

import DimiInput from "../components/dimiru/DimiInput";
import DimiButton from "../components/dimiru/DimiButton";

import { ReactComponent as BrandWithTextImage } from "../assets/brand-with-text.svg";
import TodayMeal from "../components/TodayMeal";

type TStyleByDeviceWidth = {
  [key in "tablet" | "desktop"]: SerializedStyles;
};

const until = (device: "tablet" | "desktop", style: string) =>
  (({
    tablet: css`
      @media only screen and (max-width: 769px) {
        ${style}
      }
    `,
    desktop: css`
      @media only screen and (max-width: 769px) {
        ${style}
      }
    `,
  } as TStyleByDeviceWidth)[device]);

const ContentMT = css`
  ${until("tablet", "margin-top: 1.5em")}
`;

const FirstLoginInput = css`
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  ${until(
    "tablet",
    `
    width: unset;
    display: block;
    height: unset;
    padding: 12px;
  `
  )}
  width: calc(100vw - 360px);
`;

const CLogin = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${until(
    "tablet",
    `display: block;
      width: unset;`
  )}

  .section:first-of-type {
    width: 381px;
  }
`;

const Section = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  ${until("tablet", "width: unset")}
`;

const BrandLogo = css`
  height: 69px;
  width: 253px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitButton = css`
  align-self: center;
  margin-top: 42px;
  font-weight: 800;
  ${until("tablet", "margin-top: 0.8rem")}
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 42px;
`;

export default () => {
  const history = useHistory();

  const [info, setInfo] = useState({ username: "", password: "" });
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    auth.clearAppStorage();
  }, []);

  return (
    <Container
      css={css`
        padding: 0 0.5rem;
        margin-right: auto;
        margin-left: auto;
      `}
    >
      <CLogin>
        <Section className="section">
          {/* <SectionTitle className="section__title">로그인</SectionTitle> */}
          <BrandWithTextImage css={BrandLogo} />
          <Content css={ContentMT}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setActive(false);
              }}
            >
              <DimiInput
                css={FirstLoginInput}
                placeholder="아이디"
                type="text"
                value={info.username}
                onChange={(e) => {
                  e.persist();
                  setInfo((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
              />
              <DimiInput
                placeholder="비밀번호"
                type="password"
                value={info.password}
                onChange={(e) => {
                  e.persist();
                  setInfo((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setActive(false);
                  }
                }}
              />
              <DimiButton
                css={SubmitButton}
                active={active}
                onClick={() => {
                  setActive(false);
                }}
              >
                로그인
              </DimiButton>
            </Form>
          </Content>
        </Section>
        <Section className="section">
          <TodayMeal
            meals={[
              {
                menu:
                  "베이컨&소시지구이 | 치킨너겟 | 스트링치즈 | 잡곡밥 | 새우아욱국 | 모듬과일 | 포기김치 | 오이소박이 | 야채죽 | 시리얼 | 우유 또는 포도주스",
                name: "아침",
                selected: true,
              },
              {
                menu:
                  "고추참치덮밥&계란후라이 | 우동장국 | 오지치즈후라이 | 숙주나물 | 총각김치 | 피크닉 | 석박지 | 콩나물무침 | 모듬과일 | 바이오거트",
                name: "점심",
              },
              {
                menu:
                  "알떡고기완자조림 | 쌀밥 | 닭개장 | 연두부&양념장 | 석박지 | 콩나물무침 | 모듬과일 | 바이오거트 | 미니크라상&딸기잼",
                name: "저녁",
              },
            ]}
          />
        </Section>
      </CLogin>
    </Container>
  );
};
