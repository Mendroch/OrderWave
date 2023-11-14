import { useState, useEffect } from "react";

import { Wrapper } from "./Shadow.styles";

interface ShadowProps {
  isOpen: boolean;
  toggle: () => void;
}

const Shadow = ({ isOpen, toggle }: ShadowProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    !isOpen
      ? setTimeout(() => {
          setIsDisplayed(false);
        }, 200)
      : setIsDisplayed(true);
  }, [isOpen]);

  return (
    <Wrapper
      $isdisplayed={isDisplayed}
      onClick={toggle}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    />
  );
};

export default Shadow;
