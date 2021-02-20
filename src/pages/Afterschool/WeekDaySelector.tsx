import css from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import { days } from '../../constants'
import { EventFunction } from '../../hooks/useInput'

// export const MultipleWeekdaySelector: React.FC = () => {

// }

export const WeekDaySelector: React.FC<{
    onChange: EventFunction<number>;
    value?: number;
}> = ({ value, onChange }) => {
    return <Wrapper>
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
    ${({ selected }) => selected && css`
        background-color: #FFECF1;
    `}
`

