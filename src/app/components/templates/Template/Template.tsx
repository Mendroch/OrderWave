import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import OwnerNavigation from "../../organisms/OwnerNavigation/OwnerNavigation";
import ClientNavigation from "../../organisms/ClientNavigation/ClientNavigation";
import Header from "../../molecules/Header/Header";
import Shadow from "../../molecules/Shadow/Shadow";
import { Wrapper } from "./Template.styles";

interface TemplateProps {
  type: string;
}

const Template = ({ type }: TemplateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isOpen ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <Wrapper>
      <Header toggleNavigation={toggleNavigation} />
      {type === "owner" ? (
        <OwnerNavigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      ) : (
        <ClientNavigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      )}
      <Shadow isOpen={isOpen} toggle={toggleNavigation} />
      <Outlet />
    </Wrapper>
  );
};

export default Template;
