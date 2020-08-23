import React from "react";
import styled from "@emotion/styled";
import Card from "./dimiru/DimiCard";
import css from "@emotion/css";
import { ReactComponent as IngangsilSvg } from "../assets/icons/ingangsil.svg";
import { ReactComponent as HealingsilSvg } from "../assets/icons/healingsil.svg";
import { ReactComponent as OtherSvg } from "../assets/icons/other.svg";
import { ReactComponent as LaundrySvg } from "../assets/icons/laundry.svg";
import { ReactComponent as CircleSvg } from "../assets/icons/circle.svg";

const BUTTONS = [
  {
    name: "기타",
    icon: OtherSvg,
  },
  {
    name: "인강실",
    icon: IngangsilSvg,
  },
  {
    name: "안정실",
    icon: HealingsilSvg,
    selected: true,
  },
  {
    name: "세탁",
    icon: LaundrySvg,
  },
  {
    name: "동아리",
    icon: CircleSvg,
  },
];

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
        {BUTTONS.map((status) => (
          <Button selected={status.selected}>
            <status.icon css={iconStyle} />
            <ButtonText>{status.name}</ButtonText>
          </Button>
        ))}
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
const Button = styled.div<{ selected?: boolean }>`
  color: #8a8a8a;
  text-align: center;
  & svg path {
    fill: #8a8a8a;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: #3c70e8;
      & svg path {
        fill: #3c70e8;
      }
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
