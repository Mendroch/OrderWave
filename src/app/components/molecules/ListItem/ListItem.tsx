import { Button, Wrapper } from "./ListItem.styles";
import preview from "../../../assets/icons/preview.png";
import edit from "../../../assets/icons/edit.png";
import bin from "../../../assets/icons/bin.png";

interface ListItemProps {
  name: string;
  id: string;
}

const ListItem = ({ name, id }: ListItemProps) => {
  return (
    <Wrapper>
      <p>{name}</p>
      <div id={id}>
        <Button id="preview">
          <img src={preview} alt="preview icon" />
        </Button>
        <Button id="edit">
          <img src={edit} alt="edit icon" />
        </Button>
        <Button id="delete">
          <img src={bin} alt="bin icon" />
        </Button>
      </div>
    </Wrapper>
  );
};

export default ListItem;
