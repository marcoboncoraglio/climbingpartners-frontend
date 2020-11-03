export interface ILocation {
  lat: number;
  lng: number;
}

export interface ILocationUser extends ILocation {
  id: string;
}
