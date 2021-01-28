import { useEffect } from "react";

const WHITELIST: string[] = [""];

const useConsole = (name: string, value: any) => {
  useEffect(() => {
    if (WHITELIST.includes(name)) console.log(name, value);
  }, [name, value]);
};

export default useConsole;
