import React from "react";
import styled from "@emotion/styled";

const Chip = styled.span`
  font-size: 16px;
  padding: 9px 24px;
  background-color: #3c70e8;
  color: white;
  font-weight: 700;
  border-radius: 36px;
  display: inline-block;
  & + & {
    margin-left: 12px;
  }
`;

export default Chip;
