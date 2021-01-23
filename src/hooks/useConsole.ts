import { useEffect } from "react";

const WHITELIST = ["MEAL"];

const useConsole = (name: string, value: any) => {
  useEffect(() => {
    if (WHITELIST.includes(name)) console.log(name, value);
  }, [name, value]);
};

export default useConsole;
