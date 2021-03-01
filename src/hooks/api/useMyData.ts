import { useEffect, useState } from 'react';
import { getMyData } from '../../api/user';
import { User } from '../../constants/types';

export const useMyData = () => {
  const [myData, setMyData] = useState<User | null>();
  useEffect(() => {
    getMyData()
      .then(setMyData)
      .catch(() => setMyData(null));
  }, [setMyData]);
  return myData;
};
