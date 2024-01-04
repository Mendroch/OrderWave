export interface IRestaurant {
  [x: string]: any;
  name: string;
  background: Buffer;
  backgroundType: string;
  openDays: boolean[];
  openingHours: Array<{
    start: string;
    end: string;
  }>;
  currency: string;
  _id: string;
}

export interface IRestaurants extends Array<IRestaurant> {}
