import css from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIRequestCircle } from '../../api';
import { createCircle } from '../../api/circle';
import { fetchAllStudents } from '../../api/user';
import DangerIcon from '../../assets/icons/danger.svg';
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
import { swal } from '../../functions/swal';
import { useConfig } from '../../hooks/api';
import useInput, { useTextInput } from '../../hooks/useInput';
import { TextButton } from './Applier/atomics';
import { CircleDetail } from './Applier/CircleDetail';

export const NewCircle: React.FC = () => {
  const [nameInput] = useTextInput();
  const [imageUrlInput] = useTextInput();
  const [descriptionInput] = useTextInput();

  const [students, setStudents] = useState<Doc<BriefStudent>[]>();
  const [leader, setLeader] = useState<Doc<BriefStudent>>();
  const [subleader, setSubleader] = useState<Doc<BriefStudent>>();
  const categoryInput = useInput<DropdownItem>();
  const config = useConfig();

  const history = useHistory();

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

  const register = useCallback(async () => {
    const checks = [
      !nameInput.value && '이름',
      !imageUrlInput.value && '이미지',
      !descriptionInput.value && '설명',
      !leader?._id && '동아리장',
      !subleader?._id && '부동아리장',
    ].filter((e): e is string => !!e);

    if (checks.length) {
      toast.info(checks.join(', ').을를 + ' 다시 확인해주세요');
      return;
    }

    const { isConfirmed } = await swal({
      title: '동아리를 등록하시겠어요??',
      html: (
        <>
          <p>"{nameInput.value}" 동아리를 등록해요</p>
          <p>동아리 등록 이후에는 정보를 변경하거나. 삭제할 수 없어요.</p>
        </>
      ),
      imageUrl: DangerIcon,
      showCancelButton: true,
      focusCancel: true,
    });

    if (!isConfirmed) return;

    const data: APIRequestCircle = {
      name: nameInput.value!!,
      imageUrl: imageUrlInput.value!!,
      description: descriptionInput.value!!,
      chair: leader!._id!!,
      viceChair: subleader!._id!!,
      category: categoryInput.value!.name!!,
    };

    createCircle(data)
      .then(() => {
        history.push('/circle');
      })
      .catch(() => {
        toast.error('동아리 등록에 실패했어요. 다시 시도해주세요.');
      });
  }, [
    nameInput.value,
    imageUrlInput.value,
    leader,
    subleader,
    descriptionInput.value,
    categoryInput.value,
    history,
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
            <Input {...imageUrlInput} />
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
                {...categoryInput}
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
              등록
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
