import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Button, CardGroupHeader, Horizontal, NavigationBar, PageWrapper,
  ResponsiveWrapper, showCardModal, showModal, TextCardGroup, UnstyledLink
} from '../../components'
import { Doc, Notice } from '../../constants/types'
import { getAllNotices } from '../../api/notice'
import { ReactComponent as _EditIcon } from "../../assets/icons/edit.svg"
import { ArticleModal } from './ArticleModal'
import { NewNoticeModal } from './NewNoticeModal'

const NoticeListItem: React.FC<Notice> = ({ content, title }) => <ResponsiveWrapper threshold={720}>
  <NoticeTitle>{title}</NoticeTitle>
  <NoticeContent>{content}</NoticeContent>
</ResponsiveWrapper>

const Notices: React.FC<RouteComponentProps<{
  articleId: string;
}>> = ({ match, history }) => {
  const [noticesData, setNoticesData] = useState<Doc<Notice>[]>()
  const { articleId } = match.params

  useEffect(() => {
    getAllNotices().then(setNoticesData)
  }, [])
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
    showModal(() => <NewNoticeModal />,  {
      wrapperProps: {
        css: css`max-width: 1080px; width: 100vw; height: 100vh; display: flex; padding: 60px 20px 20px;`
      },
      backdropProps: {
        css: css`overflow-y: auto;`
      }
    })
  }, [])

  return <>
    <NavigationBar />
    <PageWrapper>
      <HeaderWrapper>
        <CardGroupHeader css={css`margin-bottom: 0px;`}>공지사항</CardGroupHeader>
        <NewNoticeButton onClick={newNotice}>
          <EditIcon />
          글쓰기
        </NewNoticeButton>
      </HeaderWrapper>
      {noticesData && <TextCardGroup
        content={noticesData.map(e => ({
          text: <UnstyledLink to={`/notices/${e._id}`}><NoticeListItem {...e} /></UnstyledLink>,
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

const EditIcon = styled(_EditIcon)`
  margin-right: 12px;
`

const NewNoticeButton = styled(Button)`
  padding: 6px 18px;
`

const HeaderWrapper = styled(Horizontal)`
  justify-content: space-between;
  margin-bottom: 14px;
`

export default Notices