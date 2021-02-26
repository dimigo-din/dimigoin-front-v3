import styled from '@emotion/styled'
import css from '@emotion/css'
import { SMALL_SCREEN_THRESHOLD } from '../../constants'

const cellStyle = css`
    padding: 15px;
    text-align: center;
    vertical-align: middle;
    &:first-of-type {
        padding-left: 30px;
    }
    &:last-of-type {
        padding-right: 30px;
    }
`

export const Table = styled.table`
    padding: 25px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
    transition: 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
    font-size: 18px;
    color: #707070;
    @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
        font-size: 14px;
    }
`
export const Row = styled.tr`
    margin-top: 12px;
    &:nth-of-type(2) > td {
        padding-top: 24px;
    }
    &:last-of-type:not(:first-of-type) td {
        padding-bottom: 24px;
    }
`

export const HeadRow = styled.thead`
    color: #D1D1D1;
    border-bottom: 1px solid #EEEEEE;
`

export const HeadData = styled.th`
    ${cellStyle}
`

export const Data = styled.td`
    ${cellStyle}
`