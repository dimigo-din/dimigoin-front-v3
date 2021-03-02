import React from 'react';
import { Redirect } from 'react-router-dom';
import { Permission } from '../../constants/types';
import { useMyData } from '../../hooks/api/useMyData';
import Applier from './Applier';
import Leader from './Leader';

export const Student: React.FC = (props) => {
  const myData = useMyData();
  if (!myData) return <></>;
  if (myData.permissions.includes(Permission['circle-applier-selection']))
    return <Leader {...props} />;
  if (myData.permissions.includes(Permission['circle']))
    return <Redirect to="/circle/new" />;
  else return <Applier {...props} />;
};

export default Student;
