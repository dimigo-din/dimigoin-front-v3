import css from '@emotion/css';
import styled from '@emotion/styled';
import { Button } from '../../../components';

export const wrapperStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TextButton = styled(Button)`
  margin-top: 24px;
`;
