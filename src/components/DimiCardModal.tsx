import styled from '@emotion/styled';
import React from 'react';
import DimiCard from './dimiru/DimiCard';
import { show } from './Modal'

const Card = styled(DimiCard)`
  padding: 32px 45px 32px;
  border-top: 5px solid #3c70e8;
`;

export const showCardModal = (el: JSX.Element) => {
  show(() => <Card>
    {el}
  </Card>)
}