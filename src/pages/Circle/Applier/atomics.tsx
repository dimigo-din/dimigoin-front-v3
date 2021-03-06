import css from '@emotion/css';
import styled from '@emotion/styled';
import { Button } from '../../../components';
import { SMALL_SCREEN_THRESHOLD } from '../../../constants';

export const wrapperStyle = css`
  flex: 1;
  position: sticky;
  top: 30px;
  max-height: min(720px, 100vh - 60px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    position: static;
    max-height: unset;
    top: unset;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TextButton = styled(Button)`
  margin-top: 24px;
`;
