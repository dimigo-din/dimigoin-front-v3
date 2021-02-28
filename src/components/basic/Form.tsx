import styled from "@emotion/styled";
import { SMALL_SCREEN_THRESHOLD } from "../../constants";

export const FormHeader = styled.h2`
  font-size: 20px;
  /* font-weight: 900; */
  margin-bottom: 20px;
  &:not(:first-of-type) {
    margin-top: 40px;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 24px;
`

