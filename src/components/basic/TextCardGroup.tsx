import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import Card, { CardProps } from "./Card";
import { UnstyledLink } from "./Atomics";
import { SMALL_SCREEN_THRESHOLD } from "../../constants";

interface TextCardGroupProps {
  content: (CardProps & {
    text?: ReactNode;
    key?: string;
    to?: string;
  })[];
  spaceBetweenCards?: boolean;
}

export const TextCardGroup: React.FC<TextCardGroupProps> = ({
  content,
  spaceBetweenCards,
  ...props
}) => {
  return (
    <div css={spaceBetweenCards || shadow} {...props}>
      {content.map((i) => (
        i.to ?
          <UnstyledLink
            to={i.to}
            css={spaceBetweenCards && spaceBetweenLinksStyle}
            key={i.key || i.text?.toString()}
          >
            <TextCard
              children={i?.text}
              css={spaceBetweenCards || cancelHover}
              {...i}
            />
          </UnstyledLink>
          : <TextCard
            children={i?.text}
            css={spaceBetweenCards || cancelHover}
            {...i}
            key={i.key || i.text?.toString()}
          />
      ))}
    </div>
  );
};

export const TextCard = styled(Card)`
  font-weight: 400;
  font-size: 18px;
  font-family: "NanumSquare" !important;
  line-height: 32px;
  margin-top: 10px;

  &:first-of-type {
    margin-top: 0px;
  }

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
    padding: 16px;
  }
`;

const shadow = css`
  box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
`;

const cancelHover = css`
  box-shadow: none;
  margin-top: 0px !important;
`;

const spaceBetweenLinksStyle = css`
  display: block;
  margin-top: 10px;
  &:first-of-type {
    margin-top: 0px;
  }
`

export default TextCardGroup;
