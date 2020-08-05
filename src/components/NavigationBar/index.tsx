import React from 'react';
import styled from '@emotion/styled';

import NavigationItem from './NavigationItem';
import navigations from './navigations';

interface ITopNavbar {}

const TopNavbar: React.FC<ITopNavbar> = () => {
  return (
    <Wrapper>
      <Container>
        <NavigationList>
          {/* TODO: selected from current route */}
          {navigations.map(({ title, image, selected }, index) => {
            return (
              <NavigationItem
                key={`navigation-item-${index}`}
                title={title}
                image={image}
                selected={selected}
              />
            );
          })}
        </NavigationList>
        <ProfileContainer>
          <ProfileImage />
          <LogoutButton></LogoutButton>
        </ProfileContainer>
      </Container>
    </Wrapper>
  );
};

export default TopNavbar;

const Wrapper = styled.div`
  width: 100%;
  height: 90px;
  box-shadow: 0 0 20px 0 rgba(146, 146, 146, 0.09);
  background-color: #ffffff;
  margin-top: 12px;
  display: flex;
`;

const Container = styled.div`
  max-width: 1560px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const NavigationList = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: solid 2px #3c70e8;
  margin-right: 38.2px;
`;

const LogoutButton = styled.button`
  width: 26.5px;
  height: 26.5px;
  background-color: transparent;
  border: none;
`;
