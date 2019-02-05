export interface IUserDetails {
    birthday: Date;
    about: string;
    climbingStyles: Array<string>;
    availableEquipment: Array<string>;
    languagesSpoken: Array<string>;
}

export interface IUserCard {
    name: string;
    imgUrl: string;
}

export interface ILocation{
    lat: number;
    lng: number;
}