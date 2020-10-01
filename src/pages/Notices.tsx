import css from '@emotion/css'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { HeaderIconWrapper, Horizontal, UnstyledLink } from '../components/Atomics'
import CardGroupHeader, { Title } from '../components/CardGroupHeader'
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import DimiCard from '../components/dimiru/DimiCard'
import { Divider, ResponsiveWrapper } from '../components/grids/Cols'
import PageWrapper from '../components/grids/PageWrapper'
import { show } from '../components/Modal'
import NavigationBar from '../components/NavigationBar'
import TextCardGroup from '../components/TextCardGroup'
import getNoticesList, { INoticeItem, getNotice } from '../functions/getNotices'

const BriefNoticeTitle = styled.h2`
  font-weight: 800;
  font-size: 20px;
  color: #8A8A8A;
  flex-basis: 1;
  flex-shrink: 0;
  
`

const BriefNoticeContent = styled.p`
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

const Content = styled.p`
  font-size: 22px;
  color: #8A8A8A;
  line-height: 35px;
  &+&{
    margin-top: 12px;
  }
`

const Info = styled.p`
  margin: 12px 6px;
  color: #D1D1D1;
  font-size: 18px;
`


const NoticeListItem: React.FC<INoticeItem> = ({ content, title }) => <ResponsiveWrapper threshold={720}>
  <BriefNoticeTitle>{title}</BriefNoticeTitle>
  <BriefNoticeContent>{content}</BriefNoticeContent>
</ResponsiveWrapper>

const Article: React.FC<{ articleId: string, goBack(): void }> = ({ articleId, goBack }) => {
  const [articleData, setArticleData] = useState<INoticeItem>()
  useEffect(() => {
    getNotice(articleId).then(setArticleData).catch(() => {
      goBack()
    })
  })
  if (!articleData) return <></>
  return (<DimiCard css={css`
  border-top: 5px solid var(--main-theme-accent);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  `}>
    <Horizontal>
      <Title css={css`
        word-break: break-all;
        flex-shrink: 1;
      `}>{articleData?.title}</Title>
      <HeaderIconWrapper><CloseSvg onClick={goBack} /></HeaderIconWrapper>
    </Horizontal>
    <div css={css`padding: 12px 0px;`}>
      <Divider visible horizontal size={7} />
      {articleData.postedDate && <Horizontal css={css`flex-wrap: wrap;`}>
        <Horizontal css={css`flex-wrap: wrap;`}>
          <Info css={css`flex-shrink: 0; flex-basis: 1;`}>
            {articleData.postedDate.getFullYear()}년{` `}
            {articleData.postedDate.getMonth() + 1}월{` `}
            {articleData.postedDate.getDate()}일{` `}
            {articleData.postedDate.toLocaleTimeString().slice(0, -3)}
          </Info>
          {articleData.viewers && <Info css={css`flex-shrink: 0; flex-basis: 1;`}>· {articleData.viewers} 읽음</Info>}
        </Horizontal>
        <Horizontal css={css`flex-wrap: wrap;`}>
          <Info>{articleData.author}</Info>
        </Horizontal>
      </Horizontal>}
      <Divider visible horizontal size={7} />
    </div>
    {articleData.content.split('\n').map(e => <Content>{e}</Content>)}
  </DimiCard>)
}

const Notices: React.FC<RouteComponentProps<{
  articleId: string;
}>> = ({ match, history }) => {
  const [noticesData, setNoticesData] = useState<INoticeItem[]>()
  const { articleId } = match.params
  history.listen(() => console.log(match.params))
  useEffect(() => {
    getNoticesList().then(setNoticesData)
  }, [])
  useEffect(() => {
    articleId && show((close) => <Article goBack={() => {
      history.goBack()
      close()
    }} articleId={articleId} />, {
      wrapperProps: {
        css: css`max-width: 1080px; padding: 60px 20px 20px;`
      }
    }, () => history.push('/notices'))
  }, [articleId])
  return <>
    <NavigationBar />
    <PageWrapper>
      <CardGroupHeader>공지사항</CardGroupHeader>
      {noticesData && <TextCardGroup
        content={noticesData.map(e => ({
          text: <UnstyledLink to={`/notices/${e._id}`}><NoticeListItem {...e} /></UnstyledLink>,
          leftBorder: true,
          key: e.title,
        }))}
        spaceBetweenCards />}
    </PageWrapper>
  </>
}

export default withRouter(Notices)