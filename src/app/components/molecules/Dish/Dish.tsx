import { useTranslation } from "react-i18next";
import { IDish } from "../../../types/Dishes";
import {
  Allergens,
  Button,
  Description,
  Name,
  PriceAndButton,
  UnAvailable,
  Wrapper,
} from "./Dish.styles";

interface DishProps {
  dish: IDish;
  currency: string;
  isSectionAvailable: boolean;
}

const Dish = ({ dish, currency, isSectionAvailable }: DishProps) => {
  const { t } = useTranslation();
  const isAvailable = dish.isAvailable && isSectionAvailable;

  return (
    <Wrapper>
      <div>
        <Name>{dish.name}</Name>
        {dish?.description && <Description>{dish.description}</Description>}
        {dish?.allergens && (
          <Allergens>
            {dish.allergens.map((allergen, index) => (
              <p key={index}>{allergen}</p>
            ))}
          </Allergens>
        )}
      </div>
      <div>
        {dish?.picture && <img src={dish.picture} alt="dish" />}
        {!isAvailable && <UnAvailable>{t("menu__unavailable")}</UnAvailable>}
        <PriceAndButton>
          <p>
            {dish.price} {currency}
          </p>
          {isAvailable && <Button />}
        </PriceAndButton>
      </div>
    </Wrapper>
  );
};

export default Dish;
