import { useTranslation } from "react-i18next";
import { Menu, TopBar } from "../../atoms/NavigationStyles/NavigationStyles.styles";
import close from "../../../assets/icons/close.png";
import menu from "../../../assets/icons/menu.png";
import language from "../../../assets/icons/language.png";
import MenuOption from "../../molecules/MenuOption/MenuOption";
import { NavigationButton } from "../../atoms/NavigationButton/NavigationButton.styles";
import LangSelector from "../../molecules/LangSelector/LangSelector";

interface NavigationProps {
  isOpen: boolean;
  toggleNavigation: () => void;
}

const ClientNavigation = ({ isOpen, toggleNavigation }: NavigationProps) => {
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
        src={menu}
        title={t("navigation__menu")}
        location="/client/menu"
      />
      <MenuOption src={language} title={t("navigation__lang")}>
        <LangSelector toggleNavigation={toggleNavigation} />
      </MenuOption>
    </Menu>
  );
};

export default ClientNavigation;
