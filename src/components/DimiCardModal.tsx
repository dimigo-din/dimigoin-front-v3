import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import DimiCard from './dimiru/DimiCard';
import { show } from './Modal'

const Card = styled(DimiCard)`
  padding: 32px 45px 32px;
  border-top: 5px solid var(--main-theme-accent);
`;

export const showCardModal = (el: (close: () => void) => JSX.Element) => {
  show((close) => <Card css={css`
    width: 720px;
  `}>
    {el(close)}
  </Card>)
}