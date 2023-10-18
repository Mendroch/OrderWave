import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../organisms/Navigation/Navigation";
import Header from "../../molecules/Header/Header";
import Shadow from "../../molecules/Shadow/Shadow";

const OwnerTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header toggleNavigation={toggleNavigation} />
      <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <Shadow isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <Outlet />
    </>
  );
};

export default OwnerTemplate;
