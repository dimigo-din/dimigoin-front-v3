import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Horizontal, UnstyledLink } from '../../components';
import { ReactComponent as IconLogo } from '../../assets/brand-with-bottom-border.svg';
import { ReactComponent as _ArrowDown } from '../../assets/icons/arrow-down.svg';
import { EventFunction } from '../../hooks/useInput';

interface TopBarProps {
  clasName?: string;
  selfStudyName: string;
  hasClassInfo?: boolean;
  canSelectOtherClass?: boolean;
  onChange: EventFunction<boolean>;
  value?: boolean;
}

const getTimeString = (): string => {
  const d = new Date();
  return `${d
    .getHours()
    .toString()
    .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
};

export const TopBar: React.FC<TopBarProps> = ({
  clasName,
  selfStudyName,
  hasClassInfo,
  canSelectOtherClass,
  onChange,
  value,
}) => {
  const [isOpened, setIsOpened] = useState(value);
  const [timeString, setTimeString] = useState(getTimeString());

  useEffect(() => {
    if (isOpened !== undefined) onChange({ target: { value: isOpened } });
  }, [isOpened, onChange]);

  useEffect(() => {
    setIsOpened(() => value);
  }, [value]);

  useEffect(() => {
    const timer = setInterval(
      () => setTimeString(() => getTimeString()),
      60000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <Horizontal onClick={() => canSelectOtherClass && setIsOpened(() => true)}>
      <UnstyledLink to="/">
        <IconLogo height={48} width={32} />
      </UnstyledLink>
      <LabelWrapper>
        {canSelectOtherClass === true && (
          <ArrowWrapper isDownArrow={isOpened}>
            <Arrow />
          </ArrowWrapper>
        )}
        <ClassName>
          {hasClassInfo === true
            ? clasName || <Skeleton width={300} />
            : '학급을 선택해주세요'}
        </ClassName>
        <SelfStudyName>{selfStudyName}</SelfStudyName>
        <TimeWrapper>{timeString}</TimeWrapper>
      </LabelWrapper>
    </Horizontal>
  );
};

const LabelWrapper = styled.div`
  display: flex;
  margin-left: 32px;
  align-items: center;
  flex: 1;
`;

const ClassName = styled.h1`
  font-size: 34px;
  font-family: 'NanumSquare';
  font-weight: 900;
  margin-left: 10px;
`;

const SelfStudyName = styled.h2`
  font-size: 26px;
  margin-left: 20px;
`;

const TimeWrapper = styled(SelfStudyName)`
  flex: 1;
  text-align: right;
`;

const ArrowWrapper = styled.div<{ isDownArrow?: boolean }>`
  ${({ isDownArrow: isOpened }) =>
    isOpened &&
    css`
      & svg {
        transform: rotate(180deg);
      }
    `}
`;

const Arrow = styled(_ArrowDown)`
  transform: rotate(0deg);
  transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
`;
