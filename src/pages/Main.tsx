import React from 'react';
import styled from '@emotion/styled';

import NavigationBar from '../components/NavigationBar';
import NaiveContainer from '../components/grids/NaiveContainer';

const Main: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Container>
      </Container>
    </>
  );
};

export default Main;

const Container = styled(NaiveContainer)`
`;
