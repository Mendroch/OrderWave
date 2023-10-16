import { Menu, TopBar } from "./Navigation.styles";
import close from "../../../assets/icons/close.png";
import orders from "../../../assets/icons/orders.png";
import food from "../../../assets/icons/food.png";
import restaurant from "../../../assets/icons/restaurant.png";
import language from "../../../assets/icons/language.png";
import MenuOption from "../../molecules/MenuOption/MenuOption";
import { NavigationButton } from "../../atoms/NavigationButton/NavigationButton.styles";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  isOpen: boolean;
  toggleNavigation: () => void;
}

const Navigation = ({ isOpen, toggleNavigation }: NavigationProps) => {
  return (
    <Menu animate={{ x: isOpen ? -304 : 0 }} transition={{ ease: "easeOut", duration: 0.2 }}>
      <TopBar>
        <NavigationButton onClick={toggleNavigation}>
          <img src={close} alt="close" />
        </NavigationButton>
      </TopBar>
      <MenuOption toggle={toggleNavigation} src={orders} title="Orders" location="/owner/orders" />
      <MenuOption src={food} title="Food">
        <NavLink to={"/owner/dishes"} onClick={toggleNavigation}>
          Dishes
        </NavLink>
        <NavLink to={"/owner/sections"} onClick={toggleNavigation}>
          Sections
        </NavLink>
      </MenuOption>
      <MenuOption
        toggle={toggleNavigation}
        src={restaurant}
        title="Restaurant"
        location="/owner/restaurant"
      />
      <MenuOption src={language} title="Change language">
        <button onClick={toggleNavigation}>English</button>
        <button onClick={toggleNavigation}>Polish</button>
      </MenuOption>
    </Menu>
  );
};

export default Navigation;
