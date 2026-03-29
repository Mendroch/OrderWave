export interface ISection {
  name: string;
  isAvailable: boolean;
  hoursOfAvailability: Array<{
    start: string;
    end: string;
    _id: string;
  }>;
  _id: string;
}

export type ISections = ISection[];
