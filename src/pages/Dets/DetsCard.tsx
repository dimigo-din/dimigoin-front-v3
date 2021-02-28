import styled from "@emotion/styled"
import React from "react"
import { Card, CardProps } from "../../components"
import { SMALL_SCREEN_THRESHOLD } from "../../constants"

export const DetsCard: React.FC<CardProps & { applied?: boolean }> =
    ({ applied = false, ...props }) => {
        return <CardWrapper
                leftBorder
                borderColor={applied ? "var(--main-theme-accent)" : "#EEEEEE"}
                clickable
                {...props}
            >
            <DetsImage src="https://static.wanted.co.kr/images/company/12879/th8tivqp7gqofmdz__1080_790.jpg" />
            <CardContentWrapper>
                <CardTitle>제페토 만들기</CardTitle>
                <CardDetail>최재현</CardDetail>
                <CardContent>
                    너도 할 수 있는 제페토 만들기,
                    데츠와 함께라면 우주 대스타!
            </CardContent>
            </CardContentWrapper>
        </CardWrapper>
    }

const CardWrapper = styled(Card)`
    width: 240px;
    padding: 0px;
    margin: 15px;
    display: inline-block;

    @media screen and (max-width: 580px) {
        display: block;
        width: revert;
    }
`

const DetsImage = styled.img`
    width: 100%;
    height: 170px;
    object-fit: cover;
`

const CardTitle = styled.h3`
    font-size: 16px;
    font-weight: 900;
`

const CardContentWrapper = styled.div`
    padding: 20px;
`

const CardDetail = styled.p`
    font-size: 14px;
    color: #707070;
    font-weight: 700;
    margin-top: 10px;
`

const CardContent = styled.p`
    font-size: 14px;
    color: #707070;
    margin-top: 15px;
    line-height: 18px;
`
