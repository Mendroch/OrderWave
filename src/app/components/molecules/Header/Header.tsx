import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wrapper } from "./Header.styles";
import { NavigationButton } from "../../atoms/NavigationButton/NavigationButton.styles";
import logo from "../../../assets/icons/logo.png";
import menu from "../../../assets/icons/menu.svg";

interface HeaderProps {
  toggleNavigation: () => void;
}

const Header = ({ toggleNavigation }: HeaderProps) => {
  let location = useLocation();
  const { t } = useTranslation();

  const getLocation = () => {
    const lastSlashIndex = location.pathname.lastIndexOf("/");
    const result = location.pathname.substring(lastSlashIndex + 1);
    return t(`navigation__${result}`);
  };

  return (
    <Wrapper>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <p>{getLocation()}</p>
      <NavigationButton onClick={toggleNavigation}>
        <img src={menu} alt="menu" />
      </NavigationButton>
    </Wrapper>
  );
};

export default Header;
