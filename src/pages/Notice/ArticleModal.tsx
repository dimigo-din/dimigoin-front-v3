import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useState, useEffect } from "react"
import { getNoticeById } from "../../api/notice"
import { Card, Title, Divider, Horizontal, CompactButton, cardModalTopBorder } from "../../components"
import { SMALL_SCREEN_THRESHOLD } from "../../constants"
import { Doc, Notice } from "../../constants/types"
import { formatReadibleDate } from "../../utils"
import { isTeacher } from "../../utils/isStudent"

export const ArticleModal: React.FC<{ articleId: string, goBack(): void, article?: Notice }> = ({ articleId, goBack, article }) => {
  const [articleData, setArticleData] = useState<Doc<Notice>>()
  useEffect(() => {
    if (!article)
      getNoticeById(articleId).then(e => setArticleData(() => e)).catch(() => {
        goBack()
      })
  }, [articleId, goBack, article])
  if (!articleData) return <></>
  return (<Card css={cardModalTopBorder}>
    <Title css={css`
          word-break: break-all;
          flex-shrink: 1;
        `}>{articleData?.title}</Title>
    <div css={css`padding: 12px 0px;`}>
      <Divider visible horizontal size={7} small />
      {articleData.startDate && <Horizontal css={css`flex-wrap: wrap;`}>
        <Horizontal css={css`flex-wrap: wrap;`}>
          <Info css={css`flex-shrink: 0; flex-basis: 1;`}>
            {formatReadibleDate(new Date(articleData.createdAt))}
          </Info>
        </Horizontal>
        {articleData.author && <Horizontal css={css`flex-wrap: wrap;`}>
            <Info>{articleData.author.name} {isTeacher(articleData.author) && articleData.author.role}</Info>
          </Horizontal>}
      </Horizontal>}
      <Divider visible horizontal size={7} small />
    </div>
    {articleData.content.split('\n').map(e => <Content>{e}</Content>)}
    <div css={css`margin-top: 12px; text-align: right;`}>
      <CompactButton onClick={goBack}>닫기</CompactButton>
    </div>
  </Card>)
}

const Content = styled.p`
  font-size: 22px;
  color: #8A8A8A;
  line-height: 35px;
  &+&{
    margin-top: 12px;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
    line-height: 24px;
    &+& {
      margin-top: 6px;
    }
  }
`

const Info = styled.p`
  margin: 12px 6px;
  color: #D1D1D1;
  font-size: 18px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    margin: 0px;
    font-size: 14px;
  }
`