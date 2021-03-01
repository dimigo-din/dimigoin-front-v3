import styled from '@emotion/styled';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

export const PageWrapper = styled.div`
  max-width: 1560px;
  margin: 0 auto;
  width: 90%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    padding-top: 40px;
  }
`;

export default PageWrapper;
