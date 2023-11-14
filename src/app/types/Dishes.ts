export interface IDish {
  [x: string]: any;
  name: string;
  description?: string;
  isAvailable: boolean;
  section: string;
  allergens?: string[];
  variants?: string[];
  extraIngredients?: string[];
  removableIngredients?: string[];
  picture?: Buffer;
  pictureType: string;
  price: number;
  _id: string;
}

export interface IDishes extends Array<IDish> {}
