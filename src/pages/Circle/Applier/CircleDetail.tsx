import React from 'react';
import styled from '@emotion/styled';

import { Card } from '../../../components';
import { Circle, Doc, Merge, Student } from '../../../constants/types';
import {
  ContentWrapper,
  TextButton as SubmitButton,
  wrapperStyle,
} from './atomics';
import { Markdown } from '../../../components/basic/Markdown';

// const Content: React.FC<
//   Merge<
//     Circle,
//     {
//       onGoApply(): void;
//       chair: string;
//       viceChair?: Doc<Student>;
//     }
//   >
// > = ({ description, onGoApply }) => {
//   return (
//   );
// };

export const CircleDetail: React.FC<
  Merge<
    Circle,
    {
      chair: string;
      goApply?(): void;
      isModal?: boolean;
      viceChair?: Doc<Student>;
      preview?: boolean;
    }
  >
> = ({ goApply, description, imageUrl, category, name, preview }) => {
  return (
    <Card css={wrapperStyle}>
      <CircleLogo src={imageUrl || 'https://via.placeholder.com/120'} />
      <Category>{category || '카테고리'}</Category>
      <Title>{name || '이름'}</Title>

      <ContentWrapper>
        <Markdown>{description || '이곳에는 설명이 들어갑니다'}</Markdown>
        {!preview && <SubmitButton onClick={goApply}>지원하기</SubmitButton>}
      </ContentWrapper>
    </Card>
  );
};

const Category = styled.h2`
  font-size: 16px;
  color: #707070;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 27px;
  font-weight: 900;
  text-align: center;
  margin-top: 10px;
`;

const CircleLogo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  align-self: center;
  margin-top: 24px;
`;
