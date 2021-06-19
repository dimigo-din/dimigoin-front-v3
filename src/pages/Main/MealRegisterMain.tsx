import React from 'react';
import { Button, Card, CardGroupHeader, PageWrapper } from '../../components';
import { ReactComponent as UploadFileIcon } from '../../assets/upload-file.svg';
import { ReactComponent as DocumentIcon } from '../../assets/document.svg';
import styled from '@emotion/styled';
import css from '@emotion/css';

const MealRegisterMain = () => {
  return (
    <PageWrapper>
      <CardGroupHeader>주간 급식표 관리</CardGroupHeader>
      <CardWrapper>
        <MaxWidthedContent>
          <UploadFileIcon />
          <LoadButton>
            <DocumentIcon
              css={css`
                margin-right: 24px;
              `}
            />
            파일 선택하기
          </LoadButton>
          <AdditionalInfo>또는 파일을 이곳에 끌어다 놓으세요</AdditionalInfo>
        </MaxWidthedContent>
      </CardWrapper>
    </PageWrapper>
  );
};

const LoadButton = styled(Button)`
  margin-top: 64px;
  align-self: stretch;
  font-size: 22px;
`;

const AdditionalInfo = styled.p`
  font-size: 20px;
  color: #8a8a8a;
  margin-top: 20px;
`;

const MaxWidthedContent = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardWrapper = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MealRegisterMain;
