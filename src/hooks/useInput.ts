import { Dispatch, SetStateAction, useCallback, useState } from "react";
import useConsole from "./useConsole";

export type EventFunction<T> = (e: { target: { value: T } }) => any;

const useInput = <T = string>(
  initValue?: T,
  inputValidation?: (value: T) => boolean
) => {
  const [value, setValue] = useState<T | undefined>(initValue);
  useConsole("RECALL", "input recall" + value);
  const onChange = useCallback(({
    target: { value: willSetValue },
  }: {
    target: { value: T };
  }) => {
    if (!inputValidation) setValue(willSetValue);
    if (inputValidation && inputValidation(willSetValue))
      setValue(willSetValue);
  }, [inputValidation]);
  
  return { value, onChange, setValue };
};

export const useTextInput = (initialValue?: string): [{
    error: boolean;
    errorMessage: string | undefined;
    value: string | undefined;
    onChange: ({ target: { value: willSetValue }, }: { target: { value: string; }; }) => void;
  }, Dispatch<SetStateAction<string | undefined>>] => {
  const input = useInput(initialValue)
  const [errorMessage, setErrorMessage] = useState<string>();
  return [{
    ...input,
    error: !!errorMessage,
    errorMessage
  }, setErrorMessage]
}

export const useCheckbox = (initValue?: boolean) => {
  const [checked, setChecked] = useState(initValue || false);
  return {
    checked,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setChecked(e.target.checked),
  };
};

export default useInput;
