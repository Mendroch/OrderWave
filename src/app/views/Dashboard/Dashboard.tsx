import { useState } from "react";
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
import { Background, CartButton, RestaurantName, StyledLink } from "./Dashboard.styles";
import Section from "../../components/organisms/Section/Section";
import {
  ActionStripWrapper,
  ActionWrapper,
  ArrowRight,
} from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import arrowRight from "../../assets/icons/ArrowRightWhite.png";
import cartIcon from "../../assets/icons/cart.png";
import ShoppingCart from "../../components/organisms/ShoppingCart/ShoppingCart";
import { useCartPrice } from "../../hooks/useCartPrice";

const Dashboard = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const { currentData: dishesData } = useGetDishesQuery("");
  const { currentData: sectionsData } = useGetSectionsQuery("");
  const [cartOpen, setCartOpen] = useState(false);
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart.dishes);
  const cartPrice = useCartPrice();

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
            <>
              <ActionStripWrapper>
                <ActionWrapper>
                  <CartButton onClick={() => setCartOpen(true)}>
                    <img src={cartIcon} alt="cart" />
                  </CartButton>
                  <StyledLink to={"/client/checkout"}>
                    <Button onClick={() => {}}>
                      {t("menu__to__payment")} {cartPrice} {restaurantData[0].currency}
                      <ArrowRight src={arrowRight} alt="arrow right" />
                    </Button>
                  </StyledLink>
                </ActionWrapper>
              </ActionStripWrapper>
              <ShoppingCart isOpen={cartOpen} toggle={() => setCartOpen(false)} data={cart} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
