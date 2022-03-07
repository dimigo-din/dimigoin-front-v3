import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIRequestCircle, refetchToken } from '../../api';
import { saveCircleInfo, getMyCircle, createCircle } from '../../api/circle';
import { fetchAllStudents } from '../../api/user';
import {
  Card,
  CardGroupHeader,
  Col,
  Divider,
  FormHeader,
  Horizontal,
  Input,
  InputChip,
  PageWrapper,
  ResponsiveWrapper,
} from '../../components';
import { BriefStudent, Circle, CirclePeriod, Doc } from '../../constants/types';
import { useConfig } from '../../hooks/api';
import { useTextInput } from '../../hooks/useInput';
import { TextButton } from './Applier/atomics';
import { CircleCard } from './Applier/CircleCard';
import { CircleDetail } from './Applier/CircleDetail';

export const NewCircle: React.FC = () => {
  const [nameInput] = useTextInput();
  const [fullNameInput] = useTextInput();
  const [imageUrlInput] = useTextInput();
  const [notionInput] = useTextInput();
  const [categoryInput] = useTextInput();

  const setName = nameInput.setValue;
  const setFullName = fullNameInput.setValue;
  const setImageUrl = imageUrlInput.setValue;
  const setNotion = notionInput.setValue;
  const setCategory = categoryInput.setValue;

  const [students, setStudents] = useState<Doc<BriefStudent>[]>();
  const [leader, setLeader] = useState<Doc<BriefStudent>>();
  const [subleader, setSubleader] = useState<Doc<BriefStudent>>();
  const [prevCircleInfo, setPrevCircleInfo] = useState<Doc<Circle>>();
  const config = useConfig();

  const history = useHistory();

  const refetchCircleInfo = useCallback(() => {
    getMyCircle().then((fetchedMyCircleInfo) =>
      setPrevCircleInfo(() => fetchedMyCircleInfo),
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (!config) return;
      if (
        ![CirclePeriod.registering, CirclePeriod.submitting].includes(
          config?.CIRCLE_PERIOD,
        )
      ) {
        history.push('/circle');
      }
      const fetchedStudents = await fetchAllStudents();
      const mapped = fetchedStudents.map<Doc<BriefStudent>>((e) => ({
        ...e,
        studentId: e.serial + '',
        userId: e.idx + '',
      }));
      setStudents(() => mapped);
      refetchCircleInfo();
    })();
  }, [config, history, refetchCircleInfo]);

  useEffect(() => {
    if (!prevCircleInfo) return;
    setLeader(() => ({
      _id: prevCircleInfo.chair._id,
      createdAt: prevCircleInfo.chair.createdAt,
      name: prevCircleInfo.chair.name,
      studentId: prevCircleInfo.chair.serial + '',
      updatedAt: prevCircleInfo.chair.updatedAt,
      userId: prevCircleInfo.chair.idx + '',
    }));
    setSubleader(() => ({
      _id: prevCircleInfo.viceChair._id,
      createdAt: prevCircleInfo.viceChair.createdAt,
      name: prevCircleInfo.viceChair.name,
      studentId: prevCircleInfo.viceChair.serial + '',
      updatedAt: prevCircleInfo.viceChair.updatedAt,
      userId: prevCircleInfo.viceChair.idx + '',
    }));
    setName(prevCircleInfo.name);
    setFullName(prevCircleInfo.fullName);
    setImageUrl(prevCircleInfo.imageUrl);
    setNotion(prevCircleInfo.notion);
    setCategory(prevCircleInfo.category);
  }, [
    prevCircleInfo,
    setName,
    setImageUrl,
    setNotion,
    setCategory,
    setFullName,
  ]);

  const register = useCallback(async () => {
    const checks = [
      !nameInput.value && '이름',
      !imageUrlInput.value && '이미지',
      !notionInput.value && '동아리 소개 노션 주소',
      !leader?._id && '동아리장',
      !subleader?._id && '부동아리장',
      !categoryInput.value && '분류',
    ].filter((e): e is string => !!e);

    if (checks.length) {
      toast.info(checks.join(', ').을를 + ' 다시 확인해주세요');
      return;
    }

    const data: APIRequestCircle = {
      name: nameInput.value!!,
      imageUrl: imageUrlInput.value!!,
      notion: notionInput.value!!,
      chair: leader!._id!!,
      viceChair: subleader!._id!!,
      category: categoryInput.value!!,
      fullName: fullNameInput.value,
    };

    (prevCircleInfo
      ? saveCircleInfo(prevCircleInfo._id, data)
      : createCircle(data)
    )
      .then(() => {
        return refetchToken();
      })
      .then(() => {
        // history.push('/circle');
        toast.success('동아리 정보를 저장했어요');
        refetchCircleInfo();
      })
      .catch(() => {
        toast.error('동아리 정보를 저장하지 못했어요. 다시 시도해주세요.');
      });
  }, [
    nameInput.value,
    imageUrlInput.value,
    leader,
    subleader,
    notionInput.value,
    categoryInput.value,
    fullNameInput.value,
    prevCircleInfo,
    refetchCircleInfo,
  ]);

  return (
    <PageWrapper>
      <ResponsiveWrapper>
        <Col width={4}>
          <CardGroupHeader>동아리 정보 편집</CardGroupHeader>
          <Card
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <FormHeader>이름 <Require>*</Require></FormHeader>
            <Input {...nameInput} />
            <FormHeader>전체 이름 (선택입력)</FormHeader>
            <Input {...fullNameInput} />
            <FieldInfo>
              이름은 동아리 목록 카드에, 전체 이름은 상세내용 카드에 표시돼요.
            </FieldInfo>
            <FormHeader>로고 URL <Require>*</Require></FormHeader>
            <Input {...imageUrlInput} />
            <FormHeader>노션 URL <Require>*</Require></FormHeader>
            <Input
              placeholder='"웹에서 공유" 활성화 필요'
              {...notionInput}
            />
            <FormHeader>동아리장 <Require>*</Require></FormHeader>
            <Horizontal
              css={css`
                align-items: center;
              `}
            >
              {leader?.studentId} {leader?.name}
              <InputChip
                studentsList={students}
                onSubmit={setLeader}
                css={
                  leader &&
                  css`
                    margin-left: 12px;
                  `
                }
              />
            </Horizontal>
            <FormHeader>부동아리장 <Require>*</Require></FormHeader>
            <Horizontal
              css={css`
                align-items: center;
              `}
            >
              {subleader?.studentId} {subleader?.name}
              <InputChip
                studentsList={students}
                onSubmit={setSubleader}
                css={
                  subleader &&
                  css`
                    margin-left: 12px;
                  `
                }
              />
            </Horizontal>
            <FormHeader>분류 <Require>*</Require></FormHeader>
            {config && (
              <Input {...categoryInput} placeholder="분류를 선택해주세요" />
            )}
            <TextButton
              onClick={() => register()}
              css={css`
                align-self: stretch;
              `}
            >
              저장
            </TextButton>
          </Card>
        </Col>
        <Divider data-divider />
        <Col width={6}>
          <CardGroupHeader>미리보기</CardGroupHeader>
          <CircleCard
            category={categoryInput.value || ''}
            name={nameInput.value || ''}
            imageUrl={imageUrlInput.value || ''}
            notion={notionInput.value || ''}
            css={css`
              margin: 0px;
              margin-bottom: 12px;
            `}
          />
          <CircleDetail
            category={categoryInput.value || ''}
            name={nameInput.value || ''}
            fullName={fullNameInput.value || ''}
            chair={leader?.name || ''}
            imageUrl={imageUrlInput.value || ''}
            notion={notionInput.value || ''}
            preview
          />
        </Col>
      </ResponsiveWrapper>
    </PageWrapper>
  );
};
export default NewCircle;

const FieldInfo = styled.p`
  margin-top: 12px;
`;
const Require = styled.span`
  color: red;
`;