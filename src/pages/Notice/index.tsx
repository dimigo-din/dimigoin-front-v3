import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Button, CardGroupHeader, Horizontal, NavigationBar, PageWrapper,
  ResponsiveWrapper, showModal, TextCardGroup, UnstyledLink
} from '../../components'
import { Doc, Notice, UserType } from '../../constants/types'
import { getAllNotices, removeNotice } from '../../api/notice'
import { ReactComponent as _EditIcon } from "../../assets/icons/edit.svg"
import { ReactComponent as _TrashIcon } from "../../assets/icons/trash.svg"
import DangerIcon from "../../assets/icons/danger.svg"
import { ArticleModal } from './ArticleModal'
import { NoticeEditingModal } from './NoticeEditorModal'
import { useMyData } from '../../hooks/api/useMyData'
import { swal } from '../../functions/swal'
import { toast } from 'react-toastify'

interface NoticeListItemProps extends Notice {
  editable: boolean;
  removeAction(): void;
  editAction(): void;
}

const NoticeListItem: React.FC<NoticeListItemProps> = ({
  content, title, editable, removeAction, editAction
}) => <NoticeListItemWrapper threshold={720}>
  <NoticeTitle>{title}</NoticeTitle>
  <NoticeContent>{content}</NoticeContent>
  {editable && <>
    <EditNoticeButtonIcon onClick={e => {
      e.preventDefault()
      editAction()
    }} />
    <RemoveNoticeButtonIcon onClick={e => {
      e.preventDefault()
      removeAction()
    }} />
  </>}
</NoticeListItemWrapper>

const NOTICE_EDITING_MODAL_OPTION = {
  wrapperProps: {
    css: css`max-width: 1080px; width: 100vw; height: 100vh; display: flex; padding: 60px 20px 20px;`
  },
  backdropProps: {
    css: css`overflow-y: auto;`
  }
}

const Notices: React.FC<RouteComponentProps<{
  articleId: string;
}>> = ({ match, history }) => {
  const [noticesData, setNoticesData] = useState<Doc<Notice>[]>()
  const { articleId } = match.params

  const fetchNotices = useCallback(() => getAllNotices().then(setNoticesData), [setNoticesData])
  const myData = useMyData()

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  useEffect(() => {
    articleId && showModal((close) => <ArticleModal goBack={() => {
      history.goBack()
      close()
    }} articleId={articleId} />, {
      wrapperProps: {
        css: css`max-width: 1080px; padding: 60px 20px 20px;`
      }
    }, () => history.push('/notices'))
  }, [articleId, history])

  const newNotice = useCallback(() => {
    showModal(close => <NoticeEditingModal closeModal={() => {
      fetchNotices()
      close()
    }} />, NOTICE_EDITING_MODAL_OPTION)
  }, [fetchNotices])

  const requestRemoveNotice = async (id: string, title: string) => {
    const alertQuestionResult = await swal({
      title: "공지를 지우시겠어요?",
      html: <>
        <p>"{title}"를 삭제해요.</p>
        <p>이 작업은 취소할 수 없어요.</p>
      </>,
      imageUrl: DangerIcon,
      showCancelButton: true,
      focusCancel: true
    })
    if(!alertQuestionResult.isConfirmed) return
    try {
      const removeRequest = await removeNotice(id)
      if(removeRequest._id === id) toast.success("공지를 지웠어요")
      else toast.error("공지를 지우지 못했어요.")
    } catch(e) {
      toast.error("공지를 지우지 못했어요. 에러 : " + e)
    } finally {
      await fetchNotices()
    }
  }

  const editNotice = (origin: Notice) => {
    showModal(close => <NoticeEditingModal {...origin} closeModal={() => {
      fetchNotices()
      close()
    }} />, NOTICE_EDITING_MODAL_OPTION)
  }

  return <>
    <NavigationBar />
    <PageWrapper>
      <HeaderWrapper>
        <CardGroupHeader css={css`margin-bottom: 0px;`}>공지사항</CardGroupHeader>
        {myData?.userType === UserType.T && <NewNoticeButton onClick={newNotice}>
          <NewNoticeButtonIcon />
          글쓰기
        </NewNoticeButton>}
      </HeaderWrapper>
      {noticesData && <TextCardGroup
        content={noticesData.map(e => ({
          text: <UnstyledLink to={`/notices/${e._id}`}>
            <NoticeListItem
              editable={myData?.userType === UserType.T}
              editAction={() => editNotice(e)}
              removeAction={() => requestRemoveNotice(e._id, e.title)}
              {...e}
            />
          </UnstyledLink>,
          leftBorder: true,
          key: e._id,
        }))}
        spaceBetweenCards />}
    </PageWrapper>
  </>
}

const NoticeTitle = styled.h2`
  font-weight: 800;
  font-size: 20px;
  color: #8A8A8A;
  flex-basis: 1;
  flex-shrink: 0;
`

const NoticeContent = styled.p`
  color: #D1D1D1;
  font-size: 20px;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  @media screen and (max-width: 720px) {
    margin-left: 0px;
  
    /* styled for multiline ellipsis */
    white-space: inherit;
    display:-webkit-box; 
    word-wrap:break-word; 
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
`

const NoticeListItemButtonIconStyle = css`
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
  fill: rgba(0, 0, 0, 0.2);
  opacity: 0.5;
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`

const RemoveNoticeButtonIcon = styled(_TrashIcon)`
  ${NoticeListItemButtonIconStyle};
  padding-left: 6px;
`

const EditNoticeButtonIcon = styled(_EditIcon)`
  ${NoticeListItemButtonIconStyle}
  padding-left: 12px;
  padding-right: 6px;
`

const NewNoticeButtonIcon = styled(_EditIcon)`
  margin-right: 12px;
  fill: white;
`

const NewNoticeButton = styled(Button)`
  padding: 6px 18px;
`

const HeaderWrapper = styled(Horizontal)`
  justify-content: space-between;
  margin-bottom: 14px;
`

const NoticeListItemWrapper = styled(ResponsiveWrapper)`
  align-items: center;
  &:hover svg {
    fill: var(--main-theme-accent);
  }
`

export default Notices