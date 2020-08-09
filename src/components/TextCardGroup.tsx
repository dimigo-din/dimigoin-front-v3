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
    <Wrapper spaceBetweenCards={spaceBetweenCards} {...props}>
      {content
        .map((e) => ({
          ...e,
          children: e.text, //text로 받아온 카드의 값을 children으로 덮어씌웁니다

          ...(!spaceBetweenCards && {
            /* 카드 사이에 공간이 없게 한다면 호버효과를 강제로 끕니다
          이 부분은 차후에 더 나은 코드로 수정해주세요.. */
            hover: false,
          }),
        }))
        .map(Card)}
    </Wrapper>
  );
};

const Wrapper = styled.section<{ spaceBetweenCards?: boolean }>`
  ${({ spaceBetweenCards }) =>
    spaceBetweenCards
      ? css`
          & div + div {
            margin-top: 10px;
          }
        `
      : css`
          box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
          & > div {
            box-shadow: none;
          }
        `}
`;

export default TextCardGroup;
