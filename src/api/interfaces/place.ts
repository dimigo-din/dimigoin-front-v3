import { Doc, Place } from '../../constants/types';

export interface PrimaryPlaceList {
  method: 'GET';
  endpoint: '/place/primary';
  req: {};
  res: {
    places: Doc<Place>[];
  };
}

export interface PlaceList {
  method: 'GET';
  endpoint: '/place';
  req: {};
  res: {
    places: Doc<Place>[];
  };
}
