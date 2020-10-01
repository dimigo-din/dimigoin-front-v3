import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";

export default styled.textarea`
  border-radius: 6px;
  border: solid 1px #D1D1D1;
  width: 100%;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
  padding: 18px 16px;
  font-size: 18px;
  &::placeholder {
    color: #D1D1D1;
  }
`;
