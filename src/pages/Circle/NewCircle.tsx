import css from '@emotion/css';
import React, { useEffect, useState } from 'react';
import { fetchAllStudents } from '../../api/user';
import {
  Card,
  CardGroupHeader,
  Dropdown,
  FormHeader,
  Horizontal,
  Input,
  InputChip,
  PageWrapper,
} from '../../components';
import { BriefStudent, Doc } from '../../constants/types';
import { useConfig } from '../../hooks/api';
import { useTextInput } from '../../hooks/useInput';
import { TextButton } from './Applier/atomics';

export const NewCircle: React.FC = () => {
  const [nameInput] = useTextInput();
  const [imageUriInput] = useTextInput();
  const [descriptionInput] = useTextInput();

  const [students, setStudents] = useState<Doc<BriefStudent>[]>();
  const [leader, setLeader] = useState<BriefStudent>();
  const [subleader, setSubleader] = useState<BriefStudent>();
  const config = useConfig();

  useEffect(() => {
    (async () => {
      const fetchedStudents = await fetchAllStudents();
      const mapped = fetchedStudents.map<Doc<BriefStudent>>((e) => ({
        ...e,
        studentId: e.serial + '',
        userId: e.idx + '',
      }));
      setStudents(() => mapped);
    })();
  }, []);
  return (
    <PageWrapper>
      <CardGroupHeader>동아리 등록</CardGroupHeader>
      <Card
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <FormHeader>이름</FormHeader>
        <Input />
        <FormHeader>로고 URL</FormHeader>
        <Input />
        <FormHeader>설명</FormHeader>
        <Input />
        <FormHeader>동아리장</FormHeader>
        <Horizontal
          css={css`
            align-items: center;
          `}
        >
          {leader?.studentId} {leader?.name}
          <InputChip studentsList={students} onSubmit={setLeader} />
        </Horizontal>
        <FormHeader>부동아리장</FormHeader>
        <Horizontal
          css={css`
            align-items: center;
          `}
        >
          {subleader?.studentId} {subleader?.name}
          <InputChip studentsList={students} onSubmit={setSubleader} />
        </Horizontal>
        <FormHeader>분류</FormHeader>
        {config && (
          <Dropdown
            items={config.CIRCLE_CATEGORY.map((e) => ({
              name: e,
            }))}
            placeholder="분류를 선택해주세요"
          />
        )}
        <TextButton
          css={css`
            align-self: stretch;
          `}
        >
          개설
        </TextButton>
      </Card>
    </PageWrapper>
  );
};
export default NewCircle;
