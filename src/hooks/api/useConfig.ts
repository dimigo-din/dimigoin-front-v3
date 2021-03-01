import { useEffect, useState } from 'react';
import { getAllConfigs } from '../../api/config';
import { ServiceConfig } from '../../constants/types';

export const useConfig = () => {
  const [config, setConfig] = useState<ServiceConfig | null>();
  useEffect(() => {
    getAllConfigs()
      .then(setConfig)
      .catch(() => setConfig(() => null));
  }, []);
  return config;
};
