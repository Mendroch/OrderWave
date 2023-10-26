import React from "react";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ isActive = true, onClick, children }: ButtonProps) => {
  const handleClick = () => {
    if (isActive) onClick();
  };

  return (
    <StyledButton $isactive={isActive} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
