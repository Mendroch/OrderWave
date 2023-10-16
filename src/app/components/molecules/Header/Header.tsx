import { NavLink } from "react-router-dom";
import { Wrapper } from "./Header.styles";
import { NavigationButton } from "../../atoms/NavigationButton/NavigationButton.styles";
import logo from "../../../assets/icons/logo.png";
import menu from "../../../assets/icons/menu.svg";

interface HeaderProps {
  location?: string;
  toggleNavigation: () => void;
}

const Header = ({ location, toggleNavigation }: HeaderProps) => {
  return (
    <Wrapper>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <p>{location}</p>
      <NavigationButton onClick={toggleNavigation}>
        <img src={menu} alt="menu" />
      </NavigationButton>
    </Wrapper>
  );
};

export default Header;
