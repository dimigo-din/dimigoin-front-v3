import css from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Horizontal, UnstyledLink } from "../../components";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";
import { ReactComponent as _ArrowDown } from "../../assets/icons/arrow-down.svg";
import { EventFunction } from "../../hooks/useInput";

interface TopBarProps {
    clasName?: string;
    selfStudyName: string;
    hasClassInfo?: boolean;
    canSelectOtherClass?: boolean;
    onChange: EventFunction<boolean>;
    value?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
    clasName,
    selfStudyName,
    hasClassInfo,
    canSelectOtherClass,
    onChange,
    value
}) => {
    const [isOpened, setIsOpened] = useState(value)

    useEffect(() => {
        if (isOpened !== undefined) onChange({ target: { value: isOpened } })
    }, [isOpened, onChange])

    useEffect(() => {
        setIsOpened(() => value)
    }, [value])

    return (
        <Horizontal
            css={css`
                align-items: center;
            `}
            onClick={() => canSelectOtherClass  && setIsOpened(() => true)}
        >
            <UnstyledLink to="/">
                <IconLogo height={48} width={32} />
            </UnstyledLink>
            {canSelectOtherClass === true && <ArrowWrapper isDownArrow={isOpened}>
                <Arrow />
            </ArrowWrapper>}
            <ClassName>{hasClassInfo === true ? clasName || <Skeleton width={300} /> : "학급을 선택해주세요"}</ClassName>
            <SelfStudyName>{selfStudyName}</SelfStudyName>
        </Horizontal>
    )
};
const ClassName = styled.h1`
  font-size: 34px;
  font-family: "NanumSquare";
  font-weight: 900;
  margin-left: 10px;
`;

const SelfStudyName = styled.h2`
  font-size: 26px;
  margin-left: 20px;
`;

const ArrowWrapper = styled.div<{ isDownArrow?: boolean }>`
    margin-left: 20px;
    ${({ isDownArrow: isOpened }) => isOpened && css`
    & svg {
        transform: rotate(180deg);
    }
    `}
`

const Arrow = styled(_ArrowDown)`
    transform: rotate(0deg);
    transition: 300ms cubic-bezier(0, 0.75, 0.21, 1);
`
