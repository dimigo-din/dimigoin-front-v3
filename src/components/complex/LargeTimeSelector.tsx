import React, { useEffect } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import useInput, { EventFunction } from "../../hooks/useInput";

interface TimeSelectorProps {
  defaultHour?: number;
  defaultMinute?: number;
  onChange?: EventFunction<SelectingTime>;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  defaultHour = 9,
  defaultMinute = 30,
  onChange,
}) => {
  const hourInput = useInput(defaultHour + "", (value) => +value <= 24);
  const minuteInput = useInput(defaultMinute + "", (value) => +value <= 60);

  useEffect(() => {
    onChange &&
      onChange({
        target: {
          value: {
            hour: +hourInput.value!!,
            minute: +minuteInput.value!!,
          },
        },
      });
  }, [ hourInput.value, minuteInput.value, onChange ]);
  return (
    <TimeWrapper>
      <HalfDayWrapper>
        <HalfDay selected={+hourInput?.value!! < 12}>오전</HalfDay>
        <HalfDay
          selected={!(+hourInput.value!! < 12)}
          css={css`
            margin-top: 12px;
          `}
        >
          오후
        </HalfDay>
      </HalfDayWrapper>
      <IndicatorWrapper>
        <Indicator {...hourInput} />
        <Divider data-divider >:</Divider>
        <Indicator {...minuteInput} />
      </IndicatorWrapper>
      <FromUntil>부터</FromUntil>
    </TimeWrapper>
  );
};

export interface SelectingTime {
  hour: number;
  minute: number;
}

interface LargeTimeSelectorProps {
  value?: SelectingTime[];
  onChange?: EventFunction<SelectingTime[]>;
}

const LargeTimeSelector: React.FC<LargeTimeSelectorProps> = ({ value, onChange, ...props }) => {
  const fromInput = useInput<SelectingTime>();
  const toInput = useInput<SelectingTime>();
  useEffect(() => {
    onChange && fromInput.value && toInput.value &&
      onChange({
        target: {
          value: [fromInput.value, toInput.value],
        },
      });
  }, [ fromInput.value, toInput.value, onChange ]);
  return (
    <Wrapper {...props}>
      <TimeSelector defaultHour={9} defaultMinute={30} {...fromInput} />
      <TimeSelector defaultHour={21} defaultMinute={30} {...toInput} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 5px;
  border: solid 1px #e6e6e6;
  padding: 24px;
  background-color: white;
`;

const TimeWrapper = styled.div`
  display: flex;
  max-width: 320px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  & + & {
    margin-top: 48px;
  }
`;

const HalfDayWrapper = styled.div`

@media screen and (max-width: 400px) {
    display: none;
  }
`;

const HalfDay = styled.div<{ selected?: boolean }>`
  font-size: 20px;
  color: #d1d1d1;
  font-weight: 700;
  ${({ selected }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
    `}
`;

const IndicatorWrapper = styled.div`
  font-size: 44px;
  font-weight: 900;
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const Divider = styled.div`
  margin: 0px 12px;
  @media screen and (max-width: 500px) {
    margin: 0px 6px;
  }
`;

const Indicator = styled.input`
  padding: 8px 12px;
  border: solid 1px #e6e6e6;
  box-sizing: content-box;
  width: 60px;
  text-align: center;
  font: inherit;
  @media screen and (max-width: 500px) {
    padding: 4px 6px;
    width: 40px;
  }
`;

const FromUntil = styled.div`
  font-size: 20px;
  color: #8a8a8a;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

export default LargeTimeSelector;
