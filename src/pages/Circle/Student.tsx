import React from 'react';
import { Redirect } from 'react-router-dom';
import { CirclePeriod, Permission } from '../../constants/types';
import { useConfig } from '../../hooks/api';
import { useMyData } from '../../hooks/api/useMyData';
import Applier from './Applier';
import Leader from './Leader';

export const Student: React.FC = (props) => {
  const myData = useMyData({ noLocalData: true });
  const config = useConfig();
  if (!myData) return <></>;
  if (myData.permissions.includes(Permission['circle-applier-selection'])) {
    if (config?.CIRCLE_PERIOD === CirclePeriod.submitting)
      return <Redirect to="/circle/new" />;
    return <Leader {...props} />;
  }
  if (myData.permissions.includes(Permission['circle']))
    return <Redirect to="/circle/new" />;
  else return <Applier {...props} />;
};

export default Student;
