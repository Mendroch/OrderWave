export interface ISection {
  [x: string]: any;
  name: string;
  isAvailable: boolean;
  hoursOfAvailability: Array<{
    start: string;
    end: string;
    _id: string;
  }>;
  _id: string;
}

export interface ISections extends Array<ISection> {}
