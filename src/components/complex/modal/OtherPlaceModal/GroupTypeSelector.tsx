import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

export const CategorySelector: React.FC = ({ ...props }) => {
  return (
    <Wrapper>
      <TypeSelectorWrapper>
        <TypeSelector>위치별 보기</TypeSelector>
        <TypeSelector selected>분류별 보기</TypeSelector>
      </TypeSelectorWrapper>
      <CategoryDimmedBackground {...props}>
        <CategoryWrapper>
          {[
            '본관 1층',
            '본관 2층',
            '본관 3층',
            '신관 1층',
            '신관 2층',
            '신관 3층',
            '학봉관',
            '우정학사',
            '기타',
          ].map((place, index) => (
            <Category active={index === 3}>{place}</Category>
          ))}
        </CategoryWrapper>
      </CategoryDimmedBackground>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TypeSelectorWrapper = styled.div`
  display: flex;
  padding-top: 12px;
`;

const TypeSelector = styled.div<{ selected?: boolean }>`
  font-size: 22px;
  font-weight: 700;
  opacity: 0.4;
  padding-bottom: 10px;
  & + div {
    margin-left: 20px;
  }
  ${({ selected }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
      opacity: 1;
      border-bottom: 3px solid var(--main-theme-accent);
      font-weight: 900;
    `}
`;

const CategoryDimmedBackground = styled.div`
  background-color: #f9f9f9;
`;

const CategoryWrapper = styled.div`
  padding: 17px 7px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Category = styled.div<{ active?: boolean }>`
  font-weight: 900;
  font-size: 18px;
  padding: 8px 18px;
  opacity: 0.4;
  position: relative;
  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      & ::after {
        display: inline-block;
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #e83c77;
        content: ' ';
        top: 50%;
        transform: translateY(-50%);
        left: 2px;
      }
    `}
`;

export default CategorySelector;
