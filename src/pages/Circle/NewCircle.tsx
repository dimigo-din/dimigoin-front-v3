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
  Textarea,
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
  const [descriptionInput] = useTextInput();
  const [categoryInput] = useTextInput();

  const setName = nameInput.setValue;
  const setFullName = fullNameInput.setValue;
  const setImageUrl = imageUrlInput.setValue;
  const setDescription = descriptionInput.setValue;
  const setCategory = categoryInput.setValue;

  const [students, setStudents] = useState<Doc<BriefStudent>[]>();
  const [leader, setLeader] = useState<Doc<BriefStudent>>();
  const [subleader, setSubleader] = useState<Doc<BriefStudent>>();
  const [prevCircleInfo, setPrevCircleInfo] = useState<Doc<Circle>>();
  const config = useConfig();

  const history = useHistory();

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

      const fetchedMyCircleInfo = await getMyCircle();
      setPrevCircleInfo(() => fetchedMyCircleInfo);
    })();
  }, [config, history]);

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
    setDescription(prevCircleInfo.description);
    setCategory(prevCircleInfo.category);
  }, [
    prevCircleInfo,
    setName,
    setImageUrl,
    setDescription,
    setCategory,
    setFullName,
  ]);

  const register = useCallback(async () => {
    const checks = [
      !nameInput.value && '이름',
      !imageUrlInput.value && '이미지',
      !descriptionInput.value && '설명',
      !leader?._id && '동아리장',
      !subleader?._id && '부동아리장',
      !categoryInput.value && '부동아리장',
    ].filter((e): e is string => !!e);

    if (checks.length) {
      toast.info(checks.join(', ').을를 + ' 다시 확인해주세요');
      return;
    }

    const data: APIRequestCircle = {
      name: nameInput.value!!,
      imageUrl: imageUrlInput.value!!,
      description: descriptionInput.value!!,
      chair: leader!._id!!,
      viceChair: subleader!._id!!,
      category: categoryInput.value!!,
      fullName: fullNameInput.value,
    };

    console.log(prevCircleInfo?._id, data);

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
      })
      .catch(() => {
        toast.error('동아리 정보를 저장하지 못했어요. 다시 시도해주세요.');
      });
  }, [
    nameInput.value,
    imageUrlInput.value,
    leader,
    subleader,
    descriptionInput.value,
    categoryInput.value,
    fullNameInput.value,
    prevCircleInfo,
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
            <FormHeader>이름</FormHeader>
            <Input {...nameInput} />
            <FormHeader>전체 이름 (선택입력)</FormHeader>
            <Input {...fullNameInput} />
            <FieldInfo>
              이름은 동아리 목록 카드에, 전체 이름은 상세내용 카드에 표시돼요.
            </FieldInfo>
            <FormHeader>로고 URL</FormHeader>
            <Input {...imageUrlInput} />
            <FormHeader>설명</FormHeader>
            <Textarea
              rows={8}
              placeholder="마크다운을 지원합니다"
              {...descriptionInput}
            />
            <FormHeader>동아리장</FormHeader>
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
            <FormHeader>부동아리장</FormHeader>
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
            <FormHeader>분류</FormHeader>
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
            description={descriptionInput.value || ''}
            css={css`
              margin: 0px;
              margin-bottom: 12px;
            `}
          />
          <CircleDetail
            category={categoryInput.value || ''}
            name={fullNameInput.value || nameInput.value || ''}
            chair={leader?.name || ''}
            imageUrl={imageUrlInput.value || ''}
            description={descriptionInput.value || ''}
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
