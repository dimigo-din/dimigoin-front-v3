import React from "react";
import styled from "@emotion/styled";
import Card from "./dimiru/DimiCard";
import css from "@emotion/css";
import { ReactComponent as Headset } from "../assets/headset.svg";

const SelfStudyStatus: React.FC = () => {
  return (
    <Card
      css={css`
        padding: 0px;
      `}
    >
      <Header>
        <Time current>1타임</Time> <Time>2타임</Time>
      </Header>
      <ButtonsWrapper>
        <Button selected>
          <HeadsetIcon />
          <ButtonText>인강실</ButtonText>
        </Button>
        <Button>
          <HeadsetIcon />
          <ButtonText>인강실</ButtonText>
        </Button>
        <Button>
          <HeadsetIcon />
          <ButtonText>인강실</ButtonText>
        </Button>
        <Button>
          <HeadsetIcon />
          <ButtonText>인강실</ButtonText>
        </Button>
        <Button>
          <HeadsetIcon />
          <ButtonText>인강실</ButtonText>
        </Button>
      </ButtonsWrapper>
    </Card>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e1e1e1;
`;
const Time = styled.h2<{ current?: boolean }>`
  font-size: 22px;
  font-weight: 900;
  color: #8a8a8a;
  padding: 16px 0px;
  ${({ current }) =>
    current &&
    css`
      color: #3c70e8;
      border-bottom: 3px solid #3c70e8;
    `}
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 36px 0px;
  max-width: 720px;
  margin: -24px auto;
  flex-wrap: wrap;
`;
const iconStyle = css`
  height: 36px;
  width: 36px;
  fill: #8a8a8a;
`;
const HeadsetIcon = styled(Headset)`
  ${iconStyle}
`;
const Button = styled.div<{ selected?: boolean }>`
  color: #8a8a8a;
  text-align: center;
  ${({ selected }) =>
    selected &&
    css`
      color: #3c70e8;
    `}
  min-width: 100px;
  margin-top: 24px;
`;
const ButtonText = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-top: 18px;
`;
export default SelfStudyStatus;
