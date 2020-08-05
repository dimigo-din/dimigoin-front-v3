import React from 'react';
import {
  NavigationContainer,
  NavigationTitle,
  NavigationImage,
  NavigationBottomBar,
} from './NavigationItem.style';

export interface INavigationItem {
  title?: string;
  image?: string;
  selected?: boolean;
}

const NavigationItem: React.FC<INavigationItem> = ({
  title,
  image,
  selected = false,
}) => {
  return (
    <NavigationContainer>
      {title && (
        <NavigationTitle>{title}</NavigationTitle>
      )}
      {image && (
        <NavigationImage src={image} />
      )}
      {selected && (
        <NavigationBottomBar />
      )}
    </NavigationContainer>
  );
};

export default NavigationItem;
