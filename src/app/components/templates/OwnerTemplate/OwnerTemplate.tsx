import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../organisms/Navigation/Navigation";
import Header from "../../molecules/Header/Header";
import Shadow from "../../molecules/Shadow/Shadow";
import { Wrapper } from "./OwnerTemplate.styles";

const OwnerTemplate = () => {
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
      <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <Shadow isOpen={isOpen} toggle={toggleNavigation} />
      <Outlet />
    </Wrapper>
  );
};

export default OwnerTemplate;
