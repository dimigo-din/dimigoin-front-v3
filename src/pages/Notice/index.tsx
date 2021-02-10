import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Button, CardGroupHeader, Horizontal, NavigationBar, PageWrapper,
  ResponsiveWrapper, showModal, TextCardGroup, UnstyledLink
} from '../../components'
import { Doc, Notice, UserType } from '../../constants/types'
import { getAllNotices } from '../../api/notice'
import { ReactComponent as _EditIcon } from "../../assets/icons/edit.svg"
import { ReactComponent as _TrashIcon } from "../../assets/icons/trash.svg"
import { ArticleModal } from './ArticleModal'
import { NewNoticeModal } from './NoticeEditorModal'
import { useMyData } from '../../hooks/api/useMyData'

const NoticeListItem: React.FC<Notice & { editable: boolean }> = ({ content, title, editable }) => <NoticeListItemWrapper threshold={720}>
  <NoticeTitle>{title}</NoticeTitle>
  <NoticeContent>{content}</NoticeContent>
  {editable && <>
    <EditNoticeButtonIcon /><RemoveNoticeButtonIcon />
  </>}
</NoticeListItemWrapper>

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
    showModal(close => <NewNoticeModal closeModal={() => {
      fetchNotices()
      close()
    }} />, {
      wrapperProps: {
        css: css`max-width: 1080px; width: 100vw; height: 100vh; display: flex; padding: 60px 20px 20px;`
      },
      backdropProps: {
        css: css`overflow-y: auto;`
      }
    })
  }, [fetchNotices])

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
          text: <UnstyledLink to={`/notices/${e._id}`}><NoticeListItem editable={myData?.userType === UserType.T} {...e} /></UnstyledLink>,
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