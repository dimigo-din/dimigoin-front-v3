import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Card, Loader } from '../../components';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';
import { AfterschoolClass, Doc } from '../../constants/types';
// import { selfStudyTimesToString } from '../../utils';
import { ReactComponent as AppliedStamp } from '../../assets/stamp/applied.svg';
import DangerIcon from '../../assets/icons/danger.svg';
import {
  CardHeader,
  // CardDetail,
  CardFooterDetail,
} from '../../components/basic/CardComponent';
import { toast } from 'react-toastify';
import { applyAfterschoolClass, unapplyAfterschoolClass } from '../../api';
import { swal } from '../../functions/swal';

const applyClass = (classId: string, className: string) =>
  applyAfterschoolClass(classId)
    .then(() => toast.success(`"${className}" 강의를 신청했습니다`))
    .catch((e) => {
      toast.error(
        [
          `"${className}" 강의를 신청하지 못했습니다`,
          e?.response?.data?.message,
        ].join(', '),
      );
    });

export const unapplyClass = async (classId: string, className: string) => {
  const alertQuestionResult = await swal({
    title: '수강 신청을 취소하시겠어요?',
    html: (
      <>
        <p>"{className}" 수강을 취소해요.</p>
        <p>신청 기간이 지나면 재수강할 수 없으니 신중하게 생각해주세요.</p>
      </>
    ),
    imageUrl: DangerIcon,
    showCancelButton: true,
    focusCancel: true,
  });
  if (!alertQuestionResult.isConfirmed) return;
  unapplyAfterschoolClass(classId)
    .then(() => toast.info(`"${className}" 강의 신청을 취소했습니다`))
    .catch(() => toast.error(`"${className}" 강의 신청을 취소하지 못했습니다`));
};

export const ClassCard: React.FC<{
  afterschoolClass: Doc<AfterschoolClass>;
  applied: boolean;
  refetch(): void;
}> = ({ afterschoolClass, applied, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submit = useCallback(async () => {
    setIsLoading(() => true);
    (applied ? unapplyClass : applyClass)(
      afterschoolClass._id,
      afterschoolClass.name,
    )
      .then(() => {
        setTimeout(() => setIsLoading(() => false), 800);
      })
      .finally(() => refetch());
  }, [afterschoolClass._id, afterschoolClass.name, applied, refetch]);
  return (
    <Wrapper
      key={afterschoolClass._id}
      onClick={() => !isLoading && submit()}
      disableSpace
      leftBorder
      borderColor={applied ? 'var(--main-theme-accent)' : '#EEEEEE'}
    >
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <div>
        <CardHeader>{afterschoolClass.name}</CardHeader>
        {/* <CardDetailWrapper>
          <CardDetail>
            {selfStudyTimesToString(afterschoolClass.times)}타임
          </CardDetail>
        </CardDetailWrapper> */}
        <CardFooterDetail>
          {afterschoolClass.teacher.name === '선테계'
            ? '외부강사'
            : afterschoolClass.teacher.name}{' '}
          선생님, 남은 인원 :{' '}
          {afterschoolClass.capacity - afterschoolClass.applierCount}
        </CardFooterDetail>
      </div>
      {applied && <AppliedStamp />}
    </Wrapper>
  );
};

export default ClassCard;

const Wrapper = styled(Card)<{ isLoading?: boolean }>`
  position: relative;
  margin: 12px;
  width: 270px;
  border-radius: 0px 5px 5px 0px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    align-self: stretch;
    width: unset;
  }
`;

export const CardDetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.7);
`;
