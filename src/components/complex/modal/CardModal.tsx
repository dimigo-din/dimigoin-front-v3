import css, { SerializedStyles } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import _Card, { CardProps } from '../../basic/Card';
import { ModalOption, showModal } from './Modal';

const Card = styled(_Card)`
  padding: 32px 45px 32px;
  border-top: 5px solid var(--main-theme-accent);
`;

export const showCardModal = (
  el: (close: () => void) => JSX.Element,
  onClose?: () => void,
  props?: ModalOption & {
    cardProps?: CardProps & {
      css?: SerializedStyles;
    };
  },
) => {
  showModal(
    (close) => (
      <Card
        css={css`
          width: 720px;
          ${props?.cardProps?.css}
        `}
        {...props?.cardProps}
      >
        {el(close)}
      </Card>
    ),
    props,
    onClose,
  );
};
