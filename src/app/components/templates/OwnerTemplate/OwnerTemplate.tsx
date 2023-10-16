import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../../organisms/Navigation/Navigation";
import Header from "../../molecules/Header/Header";
import Shadow from "../../molecules/Shadow/Shadow";

const OwnerTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  let location = useLocation();

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const lastSlashIndex = location.pathname.lastIndexOf("/");
    const result = location.pathname.substring(lastSlashIndex + 1);
    setLocationName(result.charAt(0).toUpperCase() + result.slice(1));
  }, [location]);

  return (
    <div>
      <Header location={locationName} toggleNavigation={toggleNavigation} />
      <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <Shadow isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <Outlet />
    </div>
  );
};

export default OwnerTemplate;
