import { useEffect } from "react";

const WHITELIST: string[] = ["SDFFDS"];

const useConsole = (name: string, value: any) => {
  useEffect(() => {
    if (WHITELIST.includes(name)) console.log(name, value);
  }, [name, value]);
};

export default useConsole;
