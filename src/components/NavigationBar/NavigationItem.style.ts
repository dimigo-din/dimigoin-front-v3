import styled from "@emotion/styled";
import css from "@emotion/css";

export const NavigationContainer = styled.div`
  width: 89.9px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 30.15px;
  }
`;

export const NavigationTitle = styled.span<{ selected?: boolean }>`
  font-size: 22px;
  line-height: 1.18;
  color: #d1d1d1;
  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: var(--main-theme-accent);
    `}
`;

export const NavigationImage = styled.img`
  width: 32px;
  height: 37px;
  object-fit: contain;
`;

export const NavigationBottomBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 2px;
  background-color: var(--main-theme-accent);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;
