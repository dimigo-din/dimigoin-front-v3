import React, { Children, ReactNode } from "react";
import Card, { IDimiCard } from "./dimiru/DimiCard";
import styled from "@emotion/styled";
import css from "@emotion/css";

interface IProps {
  content: (IDimiCard & {
    text: ReactNode;
  })[];
  spaceBetweenCards?: boolean;
}

const TextCardGroup: React.FC<IProps> = ({
  content,
  spaceBetweenCards,
  ...props
}) => {
  return (
    <div css={spaceBetweenCards || shadow} {...props}>
      {content.map((i) => (
        <TextCard
          children={i.text}
          css={spaceBetweenCards || cancelHover}
          {...i}
        />
      ))}
    </div>
  );
};

const TextCard = styled(Card)`
  font-weight: 400;
  font-size: 18px;
  font-family: "NanumSquare" !important;
  line-height: 32px;
`;

const shadow = css`
  box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
`;

const cancelHover = css`
  box-shadow: none;
  margin-top: 0px !important;
`;

export default TextCardGroup;
