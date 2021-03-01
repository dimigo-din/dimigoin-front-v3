import styled from 'styled-components';

import 'dimigoincon';

interface DimigoinconProps {
  className?: string;
  icon:
    | 'alert'
    | 'arrow-left'
    | 'arrow-up'
    | 'arrow-right'
    | 'arrow-down'
    | 'ball'
    | 'clip'
    | 'club-sm'
    | 'comment'
    | 'counsel'
    | 'cross'
    | 'delete'
    | 'detail'
    | 'edit'
    | 'editor'
    | 'email'
    | 'facebook-sm'
    | 'hourglass'
    | 'internet-class'
    | 'list'
    | 'logout'
    | 'long-arrow-left'
    | 'long-arrow-up'
    | 'long-arrow-right'
    | 'long-arrow-down'
    | 'minus'
    | 'moon'
    | 'muffin'
    | 'notice'
    | 'ok'
    | 'ok-circle'
    | 'plus'
    | 'profile'
    | 'school-meal'
    | 'search'
    | 'service'
    | 'setting'
    | 'sun'
    | 'upload'
    | 'newspaper'
    | 'benedu'
    | 'between'
    | 'bamboo'
    | 'club-lg'
    | 'cart'
    | 'dets'
    | 'edison'
    | 'facebook-lg'
    | 'request'
    | 'research'
    | 'social'
    | 'submission';
}

const Dimigoincon = styled.span.attrs<DimigoinconProps>(
  ({ icon, className }) => ({
    className: `icon-${icon} ${className}`,
  }),
)<DimigoinconProps>``;

export default Dimigoincon;
