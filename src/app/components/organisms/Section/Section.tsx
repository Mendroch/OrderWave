import { useTranslation } from "react-i18next";
import { useCheckAvailability } from "../../../hooks/useCheckAvailability";
import { Header, UnAvailable, Wrapper } from "./Section.styles";
import { ISection } from "../../../types/Sections";
import { IDish, IDishes } from "../../../types/Dishes";
import { IRestaurant } from "../../../types/Restaurants";
import clock from "../../../assets/icons/clock.svg";
import Dish from "../../molecules/Dish/Dish";

interface SectionProps {
  section: ISection;
  dishes: IDishes;
  restaurant: IRestaurant;
}

const Section = ({ section, dishes, restaurant }: SectionProps) => {
  const isSectionAvailable = useCheckAvailability();
  const { t } = useTranslation();
  const isAvailable = isSectionAvailable(section, restaurant);

  return (
    <Wrapper key={section._id}>
      <Header id={section.name}>{section.name}</Header>
      {!isAvailable && (
        <UnAvailable>
          <img src={clock} alt="clock" />
          <p>{t("menu__section__unavailable")}</p>
        </UnAvailable>
      )}
      {dishes.map(
        (dish: IDish) =>
          dish.sectionId === section._id && (
            <Dish
              key={dish._id}
              dish={dish}
              currency={restaurant.currency}
              isSectionAvailable={isAvailable}
            />
          )
      )}
    </Wrapper>
  );
};

export default Section;
