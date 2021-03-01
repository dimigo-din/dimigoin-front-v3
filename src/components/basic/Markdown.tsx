import css from '@emotion/css';
import React, { ElementType } from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const MDRenderer: React.FC = ({ children }) => (
  <div
    css={css`
      line-height: 24px;
      flex: 1;
      margin-top: 30px;
    `}
  >
    {children}
  </div>
);

const CodeRenderer: React.FC<{ value: string }> = ({ value }) => (
  <div
    css={css`
      max-width: 100%;
      padding: 12px;
      background-color: black;
      color: white;
      font-family: monospace;
      margin: 12px 0px;
    `}
  >
    {value}
  </div>
);

const TextRenderer: React.FC<{ value: string }> = ({ value }) => (
  <span
    css={css`
      font-size: 17px;
    `}
  >
    {value}
  </span>
);

const BoldRenderer: React.FC = ({ children }) => (
  <strong
    css={css`
      font-weight: 900;
    `}
  >
    {children}
  </strong>
);

const EmphasisRenderer: React.FC = ({ children }) => (
  <em
    css={css`
      font-style: italic;
    `}
  >
    {children}
  </em>
);

const ListItemRenderer: React.FC = ({ children }) => (
  <li
    css={css`
      list-style-type: initial;
    `}
  >
    {children}
  </li>
);

const ListRenderer: React.FC<{ ordered: boolean }> = ({ children, ordered }) =>
  ordered ? (
    <ol
      css={css`
        padding: revert;
      `}
    >
      {children}
    </ol>
  ) : (
    <ul
      css={css`
        padding: revert;
      `}
    >
      {children}
    </ul>
  );

export const Markdown: React.FC<{
  children: string;
  renderer?: { [nodeType: string]: ElementType };
}> = ({ children, renderer }) => {
  return (
    <ReactMarkdown
      plugins={[remarkGfm]}
      renderers={{
        text: TextRenderer,
        strong: BoldRenderer,
        emphasis: EmphasisRenderer,
        code: CodeRenderer,
        root: MDRenderer,
        listItem: ListItemRenderer,
        list: ListRenderer,
        ...renderer,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
