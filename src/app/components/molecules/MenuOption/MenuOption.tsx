import { useState } from "react";
import { StyledLink, SubOptions, Wrapper } from "./MenuOption.styles";
import arrowUp from "../../../assets/icons/arrowUp.png";

interface MenuOptionProps {
  toggle?: () => void;
  src: string;
  title: string;
  location?: string;
  children?: React.ReactNode;
}

const MenuOption = ({ toggle, src, title, location, children }: MenuOptionProps) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  let withsub = !location?.length;

  return (
    <Wrapper onClick={toggle} $isopen={isSubOpen} $withsub={withsub}>
      {!withsub && <StyledLink to={`${location}`} />}
      <div onClick={() => setIsSubOpen(!isSubOpen)}>
        <div>
          <img src={src} alt={title} />
          <p>{title}</p>
        </div>
        {withsub && <img src={arrowUp} alt="arrowUp" />}
      </div>
      <SubOptions onClick={() => setIsSubOpen(!isSubOpen)} $isopen={isSubOpen}>
        {children}
      </SubOptions>
    </Wrapper>
  );
};

export default MenuOption;
