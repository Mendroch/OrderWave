import type { Meta, StoryObj } from "@storybook/react";
import OrdersList from "./OrdersList";

const orders = [
  {
    _id: "6508743e0d49839513118481",
    number: 167,
    dishesList: [
      {
        name: "Pizza Capriciosa",
        variant: "42cm",
        extraIngredients: ["Pepper", "Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "6508743e0d49839513118482",
      },
      {
        name: "Pizza Margarita",
        variant: "42cm",
        extraIngredients: ["Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "6508743e0d49839513118483",
      },
    ],
    __v: 0,
    deliveryMethod: "tableService",
    tableNumber: "123",
    phoneNumber: "+48 123 456 789",
    clientName: "Jan Kowalski",
  },
  {
    _id: "650874963b3cdf2b77aad029",
    number: 157,
    dishesList: [
      {
        name: "Pizza Capriciosa",
        variant: "42cm",
        extraIngredients: ["Pepper", "Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "650874963b3cdf2b77aad02a",
      },
      {
        name: "Pizza Margarita",
        variant: "42cm",
        extraIngredients: ["Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "650874963b3cdf2b77aad02b",
      },
    ],
    __v: 0,
    deliveryMethod: "pickUp",
    phoneNumber: "+48 987 654 321",
    clientName: "Anna Nowak",
  },
  {
    _id: "650b03e846025f6e0d043576",
    number: 97,
    dishesList: [
      {
        name: "Pizza Roma",
        variant: "42cm",
        extraIngredients: ["Pepper", "Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "6508743e0d49839513118482",
      },
      {
        name: "Pizza Margarita",
        variant: "42cm",
        extraIngredients: ["Mushrooms"],
        removableIngredients: ["Corn"],
        _id: "6508743e0d49839513118483",
      },
    ],
    __v: 0,
    deliveryMethod: "takeAway",
    phoneNumber: "+48 555 666 777",
    clientName: "Marek Zieliński",
  },
];

const meta = {
  title: "Molecules/OrdersList",
  component: OrdersList,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof OrdersList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    orders,
    activeOrderId: "6508743e0d49839513118481",
    setActiveOrderId: (id: string) => console.log("setActiveOrderId", id),
  },
};
