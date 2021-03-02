import css from '@emotion/css';
import React, { ElementType } from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

const MDRenderer: React.FC = ({ children }) => (
  <div
    css={css`
      line-height: 24px;
      flex: 1;
      margin-top: 30px;
      font-size: 17px;
      & h1 {
        font-size: 24px;
        font-weight: 800;
      }
      & h2 {
        font-size: 20px;
        font-weight: 700;
      }
      & * {
        max-width: 100%;
      }
      & > * + * {
        margin-top: 12px;
      }
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
      all: revert;
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

// const HeadingRenderer: React.FC = ({ children }) => {
//   return (
//     <h1
//       css={css`
//         font-size: revert;
//       `}
//     >
//       {children}
//     </h1>
//   );
// };

export const Markdown: React.FC<{
  children: string;
  renderer?: { [nodeType: string]: ElementType };
}> = ({ children, renderer }) => {
  return (
    <ReactMarkdown
      plugins={[remarkGfm]}
      allowDangerousHtml
      renderers={{
        text: TextRenderer,
        strong: BoldRenderer,
        emphasis: EmphasisRenderer,
        code: CodeRenderer,
        root: MDRenderer,
        listItem: ListItemRenderer,
        list: ListRenderer,
        blockquote: styled.blockquote`
          border-left: 4px solid rgba(0, 0, 0, 0.3);
          color: rgba(var(--main-theme-accent), 0.6);
          padding-left: 12px;
        `,
        // heading: HeadingRenderer,
        ...renderer,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
