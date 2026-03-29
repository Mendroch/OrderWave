export interface IDish {
  name: string;
  description?: string;
  isAvailable: boolean;
  sectionId: string;
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
  picture?: string;
  price: number;
  currency?: string;
  _id: string;
}

export type IDishes = IDish[];
