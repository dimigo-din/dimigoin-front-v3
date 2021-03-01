import styled from '@emotion/styled';
import React from 'react';
import { Card } from '../../components';
import { ReactComponent as ClassIcon } from '../../assets/icons/presentation.svg';
import { ReactComponent as _CircleIcon } from '../../assets/icons/circle.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as TimeIcon } from '../../assets/icons/clock.svg';
import { Markdown } from '../../components/basic/Markdown';
import { TextButton } from '../Circle/Applier/atomics';
import css from '@emotion/css';
// import { TextButton as SubmitButton } from "../../components/basic/Atomics"

// TextButton

export const DetsDetail: React.FC<{
  apply(): void;
  isModal?: boolean;
  close?(): void;
}> = ({ apply, isModal, close, ...props }) => {
  return (
    <Wrapper {...props}>
      <CardWrapper isModal={isModal}>
        <DetailImageWrapper isModal={isModal}>
          <DetailWrapper isModal={isModal}>
            <HeaderWrapper>
              <Title>제페토 만들기</Title>
              {close && <CloseIcon onClick={() => close()} />}
            </HeaderWrapper>
            <Leader>최재현</Leader>
            <InfosWrapper>
              <InfoRow>
                <ClassIcon />
                <InfoLabel>
                  <b>장소</b> 방과후 3실
                </InfoLabel>
              </InfoRow>
              <InfoRow>
                <CircleIcon />
                <InfoLabel>
                  <b>인원</b> 6 / 14명
                </InfoLabel>
              </InfoRow>
              <InfoRow>
                <TimeIcon />
                <InfoLabel>
                  <b>인원</b> 6 / 14명
                </InfoLabel>
              </InfoRow>
            </InfosWrapper>
          </DetailWrapper>
          <DetsImageWrapper>
            <DetsImage
              src="https://static.wanted.co.kr/images/company/12879/th8tivqp7gqofmdz__1080_790.jpg"
              alt="데츠 이미지"
            />
          </DetsImageWrapper>
        </DetailImageWrapper>
        <ContentWrapper isModal={isModal}>
          <Markdown>
            {`너도 할 수 있는 제페토 만들기, 데츠와 함께라면 우주 대스타!
# 제페토는?
> 대충 멋진 프로그램이라는것같은데요 사실 저도 안써봐서 몰라요 대충 써본사람이 알아서 해주겠죠 뭐
# 준비물
- 맥북
- 아이폰
- 에어팟
- 애플워치`}
          </Markdown>
        </ContentWrapper>
      </CardWrapper>
      <SubmitButton onClick={() => apply()} isModal={isModal}>
        지원하기
      </SubmitButton>
    </Wrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  flex: 1;
`;

const SubmitButton = styled(TextButton)<{ isModal?: boolean }>`
  ${({ isModal }) =>
    isModal &&
    css`
      margin-top: 0px;
      border-radius: 0px;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div<{ isModal?: boolean }>`
  padding: 0px 50px 50px;
  ${({ isModal }) =>
    isModal &&
    css`
      padding: 0px 25px 25px;
    `}
`;

const InfosWrapper = styled.div`
  margin-top: 5px;
`;

const InfoRow = styled.div`
  margin-top: 22px;
  & > * {
    vertical-align: middle;
  }
`;

const CircleIcon = styled(_CircleIcon)`
  width: 20px;
`;

const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 300;
  margin-left: 20px;
  & b {
    font-weight: 700;
  }
`;

const CardWrapper = styled(Card)<{ isModal?: boolean }>`
  padding: 0px;
  overflow: hidden;
  ${({ isModal }) =>
    isModal &&
    css`
      overflow-y: auto;
      border-radius: 0px;
      flex: 1;
    `}
`;

const Leader = styled.h3`
  font-size: 20px;
  margin-top: 10px;
`;

const DetsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetsImageWrapper = styled.div`
  flex: 1;
`;

const DetailWrapper = styled.div<{ isModal?: boolean }>`
  flex: 1;
  padding: 45px 50px;

  ${({ isModal }) =>
    isModal &&
    css`
      padding: 30px 30px 18px;
    `}
`;

const DetailImageWrapper = styled.div<{ isModal?: boolean }>`
  display: flex;
  border-bottom: 2px solid #eeeeee;
  padding-bottom: 12px;
  ${({ isModal }) =>
    isModal &&
    css`
      flex-direction: column-reverse;
    `}
`;
