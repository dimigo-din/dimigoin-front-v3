import { INavigationItem } from './NavigationItem';
import brandImage from '../../assets/brand.svg';

const navigations: INavigationItem[] = [
  { image: brandImage, selected: true },
  { title: '인강실' },
  { title: '외출' },
  { title: '상담' },
  { title: '멘토링' },
  { title: '방과후' },
  { title: 'DETS' },
];

export default navigations;
