export interface IRestaurant {
  name: string;
  background: string;
  openDays: boolean[];
  openingHours: Array<{
    start: string;
    end: string;
    _id: string;
  }>;
  currency: string;
  _id: string;
}

export type IRestaurants = IRestaurant[];
