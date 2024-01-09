import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/reduxHooks";
import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import Menu from "../../components/molecules/Menu/Menu";
import OpeningHours from "../../components/organisms/OpeningHours/OpeningHours";
import { useGetDishesQuery } from "../../features/dish-slice";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";
import { useGetSectionsQuery } from "../../features/section-slice";
import { IDish, IDishes } from "../../types/Dishes";
import { ISection, ISections } from "../../types/Sections";
import { Background, RestaurantName } from "./Dashboard.styles";
import Section from "../../components/organisms/Section/Section";
import {
  ActionStripWrapper,
  ActionWrapper,
  ArrowRight,
  LeftButton,
} from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import arrowRight from "../../assets/icons/ArrowRightWhite.png";
import cartIcon from "../../assets/icons/cart.png";

const Dashboard = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const { currentData: dishesData } = useGetDishesQuery("");
  const { currentData: sectionsData } = useGetSectionsQuery("");
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart.dishes);
  const sumCartPrice = cart.reduce((sum, elem) => sum + elem.price, 0);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const usedSections = sectionsData?.reduce((sections: ISections, section: ISection) => {
    return dishesData?.some((dish: IDish) => dish.sectionId === section._id)
      ? [...sections, section]
      : sections;
  }, []);

  return (
    <>
      {restaurantData && dishesData && sectionsData && (
        <>
          <ClientWrapper withBottomPadding={cart.length ? true : false}>
            <Background src={restaurantData[0].background} alt="restaurant background" />
            <RestaurantName>{restaurantData[0].name}</RestaurantName>
            <OpeningHours
              hours={restaurantData[0].openingHours}
              days={restaurantData[0].openDays}
            />
            <Menu sections={usedSections} />
            {usedSections.map((section: ISection) => (
              <Section
                section={section}
                dishes={dishesData?.reduce((dishes: IDishes, dish: IDish) => {
                  return dish.sectionId === section._id ? [...dishes, dish] : dishes;
                }, [])}
                restaurant={restaurantData[0]}
                key={section._id}
              />
            ))}
          </ClientWrapper>
          {cart.length > 0 && (
            <ActionStripWrapper>
              <ActionWrapper>
                <LeftButton to="/client/menu">
                  <img src={cartIcon} alt="cart" />
                </LeftButton>

                <Button onClick={() => {}}>
                  {t("menu__to__payment")} {sumCartPrice} {restaurantData[0].currency}
                  <ArrowRight src={arrowRight} alt="arrow right" />
                </Button>
              </ActionWrapper>
            </ActionStripWrapper>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
