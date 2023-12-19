export interface IDish {
  [x: string]: any;
  name: string;
  description?: string;
  isAvailable: boolean;
  section: string;
  allergens?: string[];
  variants?: [
    {
      name: string;
      extraPrice: number;
      _id: string;
    },
  ];
  extraIngredients?: [
    {
      name: string;
      extraPrice: number;
      _id: string;
    },
  ];
  removableIngredients?: string[];
  picture?: Buffer;
  pictureType: string;
  price: number;
  _id: string;
}

export interface IDishes extends Array<IDish> {}
