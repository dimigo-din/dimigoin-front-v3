import css, { SerializedStyles } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import DimiCard, { IDimiCard } from './dimiru/DimiCard';
import { IModalProps, show } from './Modal'

const Card = styled(DimiCard)`
  padding: 32px 45px 32px;
  border-top: 5px solid var(--main-theme-accent);
`;

export const showCardModal = (el: (close: () => void) => JSX.Element, onClose?: () => void, props?: IModalProps & {
  cardProps?: IDimiCard & {
    css?: SerializedStyles;
  }
}) => {
  show((close) => <Card css={css`
    width: 720px;
    ${props?.cardProps?.css}
  `} {...props?.cardProps}>
    {el(close)}
  </Card>, props, onClose)
}