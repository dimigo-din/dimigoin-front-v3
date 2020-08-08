import React, { Children } from 'react';
import Card, {IDimiCard} from './dimiru/DimiCard'
import styled from '@emotion/styled';
import css from '@emotion/css';

interface IProps {
  content: (IDimiCard & {
    text: string
  })[]
}

const TextCardGroup: React.FC<IProps> = ({
  content
}) => {
  return <>
    {content.map(e => ({...e, children: e.text})).map(Card)}
  </>
}

export default TextCardGroup