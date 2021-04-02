interface CherryblossomProps {
  amount?: number;
  size?: number;
  velocity?: number;
  windforce?: number;
  rolling?: number;
  zindex?: number;
}

declare module 'react-cherryblossom' {
  export function Cherryblossom(props: CherryblossomProps): JSX.Element;
}