import { ISection, ISections } from "../../../types/Sections";
import { Header, Sections } from "./Menu.styles";

interface MenuProps {
  sections: ISections;
}

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y });
  }
};

const Menu = ({ sections }: MenuProps) => {
  return (
    <>
      <Header>Menu</Header>
      <Sections>
        {sections.map((section: ISection, index: number) => (
          <button onClick={() => scrollTo(section.name)} key={index}>
            {section.name}
          </button>
        ))}
      </Sections>
    </>
  );
};

export default Menu;
