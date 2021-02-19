import { useEffect, useState } from "react";
import { getMyData } from "../../api/user";
import { Student } from "../../constants/types";

export const useMyData = () => {
    const [ myData, setMyData ] = useState<Student>();
    useEffect(() => {
        getMyData().then(setMyData)
    }, [setMyData])
    return myData
}
