import styled from '@emotion/styled';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';

export const CardHeader = styled.h2`
  font-size: 16px;
  font-weight: 800;
  flex: 1;
  word-break: keep-all;
  line-height: 24px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

export const CardDetail = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-top: 6px;
  color: #707070;
`;

export const CardFooterDetail = styled.p`
  font-size: 11px;
  margin-top: 12px;
  font-weight: 700px;
`;

export const CardContent = styled.p`
  font-size: 17px;
  color: #707070;
  margin-top: 15px;
  line-height: 24px;

  overflow: hidden;
  text-overflow: ellipsis;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &:hover + p {
    opacity: 1;
  }
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 14px;
  }
`;
