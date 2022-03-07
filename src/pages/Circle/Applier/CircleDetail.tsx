import React from 'react';
import styled from '@emotion/styled';

import { Card } from '../../../components';
import { Circle, Doc, Merge, Student } from '../../../constants/types';
import {
  ContentWrapper,
  TextButton as SubmitButton,
  wrapperStyle,
} from './atomics';
import { ReactComponent as _CloseIcon } from '../../../assets/icons/close.svg';

export const CircleDetail: React.FC<
  Merge<
    Circle,
    {
      chair?: string;
      goApply?(): void;
      isModal?: boolean;
      viceChair?: Doc<Student>;
      preview?: boolean;
      close?(): void;
    }
  >
> = ({
  goApply,
  notion,
  imageUrl,
  category,
  name,
  preview,
  close,
  fullName,
}) => {
  return (
    <Card css={wrapperStyle}>
      {!preview && <CloseIcon onClick={close} />}
      <CircleLogo src={imageUrl || 'https://via.placeholder.com/120'} />
      <Category>{category || '카테고리'}</Category>
      <Title>
        {(fullName?.length &&
          fullName.split('\\n').map((e) => (
            <>
              <>{e}</>
              <br />
            </>
          ))) ||
          name ||
          '이름'}
      </Title>

      <ContentWrapper>
        <NotionView src={notion || ''} />
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

const NotionView = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 27px;
  font-weight: 900;
  text-align: center;
  margin-top: 10px;
  line-height: 1.6;
`;

const CircleLogo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  align-self: center;
  margin-top: 24px;
`;

const CloseIcon = styled(_CloseIcon)`
  position: absolute;
  top: 24px;
  right: 24px;
`;
