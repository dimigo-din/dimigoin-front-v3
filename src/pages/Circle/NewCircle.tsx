import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchAllStudents } from '../../api/user';
import {
  Card,
  CardGroupHeader,
  Col,
  Divider,
  Dropdown,
  DropdownItem,
  FormHeader,
  Horizontal,
  Input,
  InputChip,
  PageWrapper,
  ResponsiveWrapper,
  Textarea,
} from '../../components';
import { BriefStudent, Doc } from '../../constants/types';
import { useConfig } from '../../hooks/api';
import useInput, { useTextInput } from '../../hooks/useInput';
import { ReactComponent as CancelSvg } from '../../assets/icons/close.svg';
import { TextButton } from './Applier/atomics';
import { CircleDetail } from './Applier/CircleDetail';

const Image = styled.img`
  width: 320px;
  margin-top: 16px;
`;

export const NewCircle: React.FC = () => {
  const [nameInput] = useTextInput();
  const [imageUriInput] = useTextInput();
  const [descriptionInput] = useTextInput();

  const [students, setStudents] = useState<Doc<BriefStudent>[]>();
  const [leader, setLeader] = useState<Doc<BriefStudent>>();
  const [subleader, setSubleader] = useState<Doc<BriefStudent>>();
  const categoryInput = useInput<DropdownItem>();
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

  const register = useCallback(() => {
    console.log({
      name: nameInput.value,
      imageUri: imageUriInput.value,
      description: descriptionInput.value,
      chair: leader?._id,
      viceChair: subleader?._id,
    });
  }, [
    nameInput.value,
    imageUriInput.value,
    leader,
    subleader,
    descriptionInput.value,
  ]);

  return (
    <PageWrapper>
      <ResponsiveWrapper>
        <Col width={5}>
          <CardGroupHeader>동아리 등록</CardGroupHeader>
          <Card
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <FormHeader>이름</FormHeader>
            <Input {...nameInput} />
            <FormHeader>로고 URL</FormHeader>
            <Input {...imageUriInput} />
            {/* <Image src={imageUriInput.value} /> */}
            <FormHeader>설명</FormHeader>
            <Textarea
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
              <InputChip studentsList={students} onSubmit={setLeader} />
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
                closeWithSubmit
              />
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
              onClick={() => register()}
              css={css`
                align-self: stretch;
              `}
            >
              개설
            </TextButton>
          </Card>
        </Col>
        <Divider />
        <Col width={5}>
          <CardGroupHeader>미리보기</CardGroupHeader>
          <CircleDetail
            category={categoryInput.value?.name || ''}
            name={nameInput.value || ''}
            chair={leader?.name || ''}
            imageUrl={imageUriInput.value || ''}
            description={descriptionInput.value || ''}
            preview
          />
        </Col>
      </ResponsiveWrapper>
    </PageWrapper>
  );
};
export default NewCircle;

const CancelIcon = styled(CancelSvg)`
  width: 12px;
  height: 12px;
  padding: 6px;
  border-radius: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0.5;
  margin-right: 6px;
`;

const StudentPill = styled.p`
  display: inline-block;
  padding: 12px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);
`;
