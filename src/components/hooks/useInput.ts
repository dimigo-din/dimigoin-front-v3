import { useState } from "react";

export type EventFunction<T> = (e: { target: { value: T } }) => any;

const useInput = <T = string>(
  initValue?: any,
  inputValidation?: (value: T) => boolean
) => {
  const [value, setValue] = useState<T>(initValue);

  const onChange = ({
    target: { value: willSetValue },
  }: {
    target: { value: T };
  }) => {
    if (!inputValidation) setValue(willSetValue);
    if (inputValidation && inputValidation(willSetValue))
      setValue(willSetValue);
  };
  return { value, onChange };
};

export default useInput;
