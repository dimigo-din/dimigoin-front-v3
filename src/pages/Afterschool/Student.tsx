import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { getAfterschoolClassList, getAppliedClasses } from '../../api';
import {
  Card,
  CardGroupHeader,
  Col,
  Divider,
  NoData,
  PageWrapper,
  ResponsiveWrapper,
} from '../../components';
import { CardHeader, CardDetail } from '../../components/basic/CardComponent';
import {
  dayEngKorMapper,
  engDays,
  SMALL_SCREEN_THRESHOLD,
} from '../../constants';
import {
  Doc,
  AfterschoolClass,
  AfterschoolClassApplication,
  EngDay,
} from '../../constants/types';
import useInput from '../../hooks/useInput';
import { selfStudyTimesToString } from '../../utils';
import { CardDetailWrapper, ClassCard, unapplyClass } from './ClassCard';
import { WeekDaySelector } from './WeekDaySelector';

const AfterschoolApply: React.FC = () => {
  const [afterschoolClassList, setAfterschoolClassList] = useState<
    Doc<AfterschoolClass>[] | null
  >();
  const [appliedClasses, setAppliedClasses] = useState<
    Doc<AfterschoolClassApplication>[] | null
  >();
  const weekDaySelectorInput = useInput<number | null>(null);
  // const weekDaySelectorValue = weekDaySelectorInput.value

  const [filteredClasses, setFilteredClasses] = useState<
    Doc<AfterschoolClass>[] | null
  >();

  useEffect(() => {
    if (weekDaySelectorInput.value === null)
      setFilteredClasses(() => afterschoolClassList);
    else
      setFilteredClasses(() =>
        afterschoolClassList?.filter((afterschoolClass) =>
          afterschoolClass.days.includes(
            engDays[weekDaySelectorInput.value!!] as EngDay,
          ),
        ),
      );
  }, [weekDaySelectorInput.value, afterschoolClassList]);

  const fetchClassListData = useCallback(() => {
    getAfterschoolClassList()
      .then(setAfterschoolClassList)
      .catch(() => setAfterschoolClassList(null));
  }, [setAfterschoolClassList]);

  const fetchAppliedClassData = useCallback(() => {
    getAppliedClasses()
      .then(setAppliedClasses)
      .catch(() => setAppliedClasses(null));
  }, []);

  const fetchData = useCallback(() => {
    fetchClassListData();
    fetchAppliedClassData();
  }, [fetchClassListData, fetchAppliedClassData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageWrapper>
      <RootWrapper mobileReverse threshold={840}>
        <Col width={7}>
          <CardGroupHeader
            subButton={{
              text: '신청한 강좌는 빨간 선으로 표시됩니다',
            }}
          >
            방과후
          </CardGroupHeader>
          <RegisterColumnWrapper>
            <ResponsiveWeekDaySelector {...weekDaySelectorInput} css={sticky} />
            <Divider small data-divider />
            <CardGridWrapper>
              {filteredClasses?.map(
                (afterschoolClass) =>
                  appliedClasses && (
                    <ClassCard
                      afterschoolClass={afterschoolClass}
                      applied={appliedClasses?.some(
                        ({ afterschool: registeredClass }) =>
                          registeredClass._id === afterschoolClass._id,
                      )}
                      refetch={fetchData}
                    />
                  ),
              )}
            </CardGridWrapper>
          </RegisterColumnWrapper>
        </Col>
        <Divider small data-divider />
        <Appliments width={3} css={sticky}>
          <CardGroupHeader>신청 목록</CardGroupHeader>
          {appliedClasses?.length ? (
            appliedClasses?.map(({ afterschool: appliedClass }) => (
              <Card
                key={appliedClass._id}
                onClick={() =>
                  unapplyClass(appliedClass._id, appliedClass.name)
                }
              >
                <CardHeader>{appliedClass.name}</CardHeader>
                <CardDetailWrapper>
                  <CardDetail>{appliedClass.teacher.name} 선생님,</CardDetail>
                  <CardDetail>
                    {appliedClass.days
                      ?.map((day) => dayEngKorMapper[day])
                      .join(' ')}
                    요일,
                  </CardDetail>
                  <CardDetail>
                    {selfStudyTimesToString(appliedClass.times)}타임
                  </CardDetail>
                </CardDetailWrapper>
              </Card>
            ))
          ) : (
            <Card>
              <NoData>신청한 강좌가 없습니다</NoData>
            </Card>
          )}
        </Appliments>
      </RootWrapper>
    </PageWrapper>
  );
};

export default AfterschoolApply;

const Appliments = styled(Col)`
  max-height: calc(100vh - 80px);
  overflow-y: auto;
`;

const sticky = css`
  @media screen and (min-width: ${SMALL_SCREEN_THRESHOLD}px) {
    position: sticky;
    top: 40px;
  }
`;

const RootWrapper = styled(ResponsiveWrapper)`
  flex: 1;
`;

const RegisterColumnWrapper = styled(ResponsiveWrapper)`
  flex: 1;
  align-items: flex-start;
  @media screen and (max-width: 720px) {
    align-items: stretch;
  }
`;

const CardGridWrapper = styled(ResponsiveWrapper)`
  flex-wrap: wrap;
  margin: -12px;
  @media screen and (max-width: 1080px) {
    flex: 1;
    & > * {
      /* width: unset !important;
            flex: 1; */
    }
  }
`;

const ResponsiveWeekDaySelector = styled(WeekDaySelector)`
  align-self: stretch;
  max-height: min(685px, 100vh - 248px);
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    display: flex;
    flex: 1;
    & > div {
      width: unset;
      flex: 1;
    }
  }
`;
