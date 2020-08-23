import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState<string | number>();

  const onChange = ({
    target: { value: willSetValue },
  }: {
    target: { value: string | number };
  }) => {
    setValue(willSetValue);
  };
  return { value, onChange };
};

export default useInput;
