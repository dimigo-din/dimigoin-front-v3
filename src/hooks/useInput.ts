import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export type EventFunction<T> = (e: { target: { value: T } }) => any;

const useInput = <T = string>(
  initValue?: T,
  inputValidation?: (value: T) => boolean
) => {
  const [value, setValue] = useState<T | undefined>(initValue);

  const onChange = useCallback(({
    target: { value: willSetValue },
  }: {
    target: { value: T };
  }) => {
    if (!inputValidation) setValue(willSetValue);
    if (inputValidation && inputValidation(willSetValue))
      setValue(willSetValue);
  }, [inputValidation]);
  
  return { defaultValue: initValue, value, onChange, setValue };
};

export const useTextInput = (
  initValue?: string,
  inputValidation?: (value: string) => boolean
): [{
    error: boolean;
    errorMessage: string | undefined;
    value: string | undefined;
    onChange: ({ target: { value: willSetValue }, }: { target: { value: string; }; }) => void;
    setValue: Dispatch<SetStateAction<string | undefined>>;
  }, Dispatch<SetStateAction<string | undefined>>] => {
  const { setValue, ...input } = useInput(initValue, inputValidation)
  useEffect(() => {
    setValue(() => initValue)
  }, [ initValue, setValue ])

  const [errorMessage, setErrorMessage] = useState<string>();
  
  return [{
    ...input,
    setValue,
    error: !!errorMessage,
    errorMessage
  }, setErrorMessage]
}

export const useCheckbox = (initValue?: boolean) => {
  const [checked, setChecked] = useState<boolean | undefined>(initValue || false);
  useEffect(() => setChecked(() => initValue), [ initValue ])
  return {
    defaultChecked: initValue,
    checked,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setChecked(e.target.checked),
  };
};

export default useInput;
