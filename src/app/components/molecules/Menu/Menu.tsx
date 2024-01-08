import { ISection, ISections } from "../../../types/Sections";
import { Header, Sections } from "./Menu.styles";

interface MenuProps {
  sections: ISections;
}

const Menu = ({ sections }: MenuProps) => {
  return (
    <>
      <Header>Menu</Header>
      <Sections>
        {sections.map((section: ISection, index: number) => (
          <a href={`#${section.name}`} key={index}>
            {section.name}
          </a>
        ))}
      </Sections>
    </>
  );
};

export default Menu;
