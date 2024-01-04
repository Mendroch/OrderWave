export interface IRestaurant {
  [x: string]: any;
  name: string;
  background: string;
  backgroundType: string;
  openDays: boolean[];
  openingHours: Array<{
    start: string;
    end: string;
    _id: string;
  }>;
  currency: string;
  _id: string;
}

export interface IRestaurants extends Array<IRestaurant> {}
