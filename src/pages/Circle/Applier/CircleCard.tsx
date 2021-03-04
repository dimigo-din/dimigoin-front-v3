import css from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import { Card } from '../../../components';
import {
  CircleApplicationStatusValues,
  SMALL_SCREEN_THRESHOLD,
} from '../../../constants';
import { CircleWithApplication } from '.';
import Skeleton from 'react-loading-skeleton';

const statusLabelMap = {
  applied: '결과 대기중',
  'document-fail': '서류 불합격',
  'document-pass': '서류 합격',
  'interview-fail': '면접 불합격',
  'interview-pass': '면접 합격',
  final: '최종 선택',
};

export const DummyCircleCard: React.FC = (props) => (
  <Wrapper {...props} disableSpace>
    <CardContentWrapper>
      <Skeleton width={70} height={70} />
      <DetailWrapper>
        <Category>
          <Skeleton width={100} />
        </Category>
        <Name>
          <Skeleton width={50} />
        </Name>
        <Content>
          <Status>
            <Skeleton width={100} />
          </Status>
        </Content>
      </DetailWrapper>
    </CardContentWrapper>
  </Wrapper>
);

export const CircleCard: React.FC<
  CircleWithApplication & {
    openSideDetail(): void;
    finalSelect(): void;
    isPreview?: boolean;
  }
> = ({
  imageUrl,
  name,
  category,
  status,
  openSideDetail,
  finalSelect,
  description,
  isPreview,
  ...props
}) => {
  return (
    <Wrapper
      {...props}
      onClick={status && isPreview ? undefined : openSideDetail}
      disableSpace
    >
      <CardContentWrapper>
        <Logo src={imageUrl} />
        <DetailWrapper>
          <Category>{category}</Category>
          <Name>{name}</Name>
        </DetailWrapper>
      </CardContentWrapper>
      {/* {!isPreview && ( */}
      <ApplyButton
        status={status}
        isPreview={isPreview}
        onClick={
          status
            ? {
                applied: openSideDetail,
                'document-fail': undefined,
                'document-pass': undefined,
                'interview-fail': undefined,
                'interview-pass': finalSelect,
                final: undefined,
              }[status]
            : openSideDetail
        }
      >
        {isPreview
          ? '8일 공개'
          : status
          ? statusLabelMap[status]
          : '자세히보기'}
      </ApplyButton>
      {/* )} */}
    </Wrapper>
  );
};

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 16px; */
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    padding: 0px;
    flex-direction: row;
    margin-bottom: 16px;
  }
`;

const statusColorMap = {
  applied: '#B8B8B8',
  'document-fail': '#B8B8B8',
  'document-pass': '#2888DD',
  'interview-fail': '#B8B8B8',
  'interview-pass': '#57B894',
  final: '#E83C77',
};
const ApplyButton = styled.div<{
  status?: typeof CircleApplicationStatusValues[number] | null;
  isPreview?: boolean;
}>`
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  align-self: stretch;
  border-radius: 5px;
  ${({ status, isPreview }) => {
    const color = isPreview
      ? '#B8B8B8'
      : status
      ? statusColorMap[status]
      : '#E83C77';
    return css`
      color: ${color};
      border-color: ${color};
    `;
  }};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    margin-bottom: 0px;
  }
`;

const Wrapper = styled(Card)`
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 150px;
  height: 250px;
  /* align-items: center; */
  padding: 36px 10px 10px 10px;
  border-radius: 5px;
  overflow: hidden;
  margin: 15px;
  justify-content: space-between;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    flex: 1;
    width: inherit;
    height: inherit;
    margin: 0px;
    margin-top: 12px;
    padding: 36px 16px 16px 16px;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    align-items: flex-start;
    margin-left: 12px;
  }
`;

const Category = styled.p`
  font-weight: 800;
  font-size: 14px;
  color: #8a8a8a;
  margin-top: 20px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    margin-top: 0px;
  }
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 800;
  margin-top: 6px;
  text-align: center;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

const Status = styled.p<{
  status?: typeof CircleApplicationStatusValues[number] | null;
}>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ status }) => (status ? statusColorMap[status] : '#E83C77')};
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;
