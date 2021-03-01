import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CardGroupHeader,
  Col,
  NoData,
  PageWrapper,
  ResponsiveWrapper,
  showModal,
  TextCard,
} from '../../components';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';
import { DetsCard } from './DetsCard';
import { DetsDetail } from './DetsDetail';
const Applier: React.FC = () => {
  const [sideDetail, setSideDetail] = useState<{} | null>(null);
  const [detsList /* setDetsList */] = useState<unknown[]>([]);

  const apply = useCallback(() => {
    toast.error('신청 가능한 상태가 아닙니다');
  }, []);

  const openDetsDetail = useCallback(
    (index: number) => {
      if (window.innerWidth < 1100) {
        showModal(
          (close) => <DetsDetail isModal close={close} apply={() => apply()} />,
          {
            wrapperProps: {
              css: css`
                max-width: min(720px, 100vw);
                width: 100vw;
                height: 100vh;
                display: flex;
                padding: 60px 20px 20px;
                @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
                  padding: 0px;
                }
              `,
            },
            backdropProps: {
              css: css`
                overflow-y: auto;
              `,
            },
          },
        );
      } else setSideDetail(() => ({}));
    },
    [apply],
  );

  return (
    <PageWrapper>
      <ResponsiveWrapper>
        <Col width={sideDetail ? 5 : 10}>
          <CardGroupHeader
            subButton={{
              text: '학생 주도로 이루어지는 방과후 활동입니다.',
            }}
          >
            DETS
          </CardGroupHeader>
          {detsList.length ? (
            <DetsGrid>
              {[...Array(7)].map((_, index) => (
                <DetsCard
                  key={`MOCKDETS${index}`}
                  onClick={() => openDetsDetail(index)}
                />
              ))}
            </DetsGrid>
          ) : (
            <TextCard>
              <NoData>현재 신청 가능한 DETS가 없습니다</NoData>
            </TextCard>
          )}
        </Col>
        {sideDetail && (
          <Col width={5}>
            <DetsDetail
              css={css`
                margin-top: 39px;
                flex: 1;
              `}
              apply={() => apply()}
            />
          </Col>
        )}
      </ResponsiveWrapper>
    </PageWrapper>
  );
};

const DetsGrid = styled.div`
  margin: -15px;
`;

export default Applier;
