import css from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import { days } from '../../constants'
import { EventFunction } from '../../hooks/useInput'

// export const MultipleWeekdaySelector: React.FC = () => {

// }

export const WeekDaySelector: React.FC<{
    onChange: EventFunction<number | null>;
    value?: number | null;
}> = ({ value, onChange }) => {
    return <Wrapper>
        <Segment
            selected={value === null}
            onClick={() => onChange({
                target: {
                    value: null
                }
            })}
        >전체</Segment>
        {days.slice(0, -1).map((e, i) =>
            <Segment
                selected={i === value}
                onClick={() => onChange({
                    target: {
                        value: i
                    }
                })}> {e} </Segment>)}
    </Wrapper>
}

const Wrapper = styled.div`
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03);
`

const Segment = styled.div<{ selected: boolean }>`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #8B8B8B;
    font-weight: 900;
    transition: 300ms cubic-bezier(0, 0.76, 0.12, 0.98);
    ${({ selected }) => selected && css`
        background-color: #FFECF1;
        color: #4E4E4E;
    `}
`

