import { useTranslation } from "react-i18next";
import { Menu, TopBar } from "./Navigation.styles";
import close from "../../../assets/icons/close.png";
import orders from "../../../assets/icons/orders.png";
import food from "../../../assets/icons/food.png";
import restaurant from "../../../assets/icons/restaurant.png";
import language from "../../../assets/icons/language.png";
import MenuOption from "../../molecules/MenuOption/MenuOption";
import { NavigationButton } from "../../atoms/NavigationButton/NavigationButton.styles";
import { NavLink } from "react-router-dom";
import LangSelector from "../../molecules/LangSelector/LangSelector";

interface NavigationProps {
  isOpen: boolean;
  toggleNavigation: () => void;
}

const Navigation = ({ isOpen, toggleNavigation }: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <Menu animate={{ x: isOpen ? -304 : 0 }} transition={{ ease: "easeOut", duration: 0.2 }}>
      <TopBar>
        <NavigationButton onClick={toggleNavigation}>
          <img src={close} alt="close" />
        </NavigationButton>
      </TopBar>
      <MenuOption
        toggle={toggleNavigation}
        src={orders}
        title={t("navigation__orders")}
        location="/owner/orders"
      />
      <MenuOption src={food} title={t("navigation__food")}>
        <NavLink to={"/owner/dishes"} onClick={toggleNavigation}>
          {t("navigation__dishes")}
        </NavLink>
        <NavLink to={"/owner/sections"} onClick={toggleNavigation}>
          {t("navigation__sections")}
        </NavLink>
      </MenuOption>
      <MenuOption
        toggle={toggleNavigation}
        src={restaurant}
        title={t("navigation__restaurant")}
        location="/owner/restaurant"
      />
      <MenuOption src={language} title={t("navigation__lang")}>
        <LangSelector toggleNavigation={toggleNavigation} />
      </MenuOption>
    </Menu>
  );
};

export default Navigation;
