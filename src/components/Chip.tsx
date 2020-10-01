import styled from "@emotion/styled";

const Chip = styled.div`
  font-size: 16px;
  padding: 9px 24px;
  background-color: var(--main-theme-accent);
  color: white;
  font-weight: 700;
  border-radius: 36px;
  display: inline-block;
  & + & {
    /* margin-left: 12px; */
  }
`;

export default Chip;
