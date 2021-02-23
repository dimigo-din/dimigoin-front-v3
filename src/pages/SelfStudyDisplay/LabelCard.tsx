import css, { SerializedStyles } from "@emotion/css";
import styled from "@emotion/styled";
import React, { RefObject } from "react";

interface LabelCardProps {
    title: string | boolean;
    contentCss?: SerializedStyles;
    width?: number;
    hasLabel?: boolean;
    ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

export const LabelCard: React.FC<LabelCardProps> = React.forwardRef(({
    children,
    title,
    contentCss,
    width,
    hasLabel,
    ...props
}, ref) => {
    return (
        <LabelWrapper {...props} width={width} ref={ref}>
            {title && <LabelTitle visible={!!hasLabel}>{title}</LabelTitle>}
            <ContentWrapper hasLabel={!!(title && hasLabel)} css={contentCss}>{children}</ContentWrapper>
        </LabelWrapper>
    )
});

const ContentWrapper = styled.div<{ hasLabel: boolean; }>`
    border: 1px solid var(--row-color);
    padding: 14px;
    color: var(--row-color);
    font-size: 23px;
    font-weight: 700;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: white;
  
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    ${({ hasLabel }) => !hasLabel && css`border-radius: 5px;`}
  `;

const LabelWrapper = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  /* margin-top: 15px; */
  ${({ width }) =>
        width &&
        css`
      width: ${width}px;
    `}
`;

const LabelTitle = styled.h3<{ visible: boolean }>`
  color: white;
  background-color: var(--row-color);
  padding: 8px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  
  ${({ visible }) => !visible && css`
    @media screen and (min-width: 800px) {
      display: none;
    }
  `}
`;