import css from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Horizontal, UnstyledLink } from "../../components";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";

interface TopBarProps {
    clasName?: string;
    selfStudyName: string;
    hasClassInfo?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
    clasName,
    selfStudyName,
    hasClassInfo
}) => {
    return (
        <Horizontal
            css={css`
          align-items: center;
        `}
        >
            <UnstyledLink to="/">
                <IconLogo height={48} width={32} />
            </UnstyledLink>
            <ClassName>{hasClassInfo === true ? clasName || <Skeleton width={300} /> : "학급을 선택해주세요"}</ClassName>
            <SelfStudyName>{selfStudyName}</SelfStudyName>
        </Horizontal>
    )
};
const ClassName = styled.h1`
  font-size: 34px;
  font-family: "NanumSquare";
  font-weight: 900;
  margin-left: 20px;
`;

const SelfStudyName = styled.h2`
  font-size: 26px;
  margin-left: 20px;
`;
