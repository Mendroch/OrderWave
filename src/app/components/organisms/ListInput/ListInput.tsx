import { useState, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { Input, Label } from "../../atoms/FormStyles/FormStyles.styles";
import { AddButton, InputsWrapper, List, ListItem } from "./ListInput.styles";
import bin from "../../../assets/icons/bin.png";

interface ListInputProps {
  inputName: string;
  withPrice?: boolean;
  cb: (data: any) => void;
}

const reducer = (items: any, action: any) => {
  return action.type === "add"
    ? [...items, action.payload]
    : items.filter((item: string) => item !== action.payload);
};

const ListInput = ({ inputName, withPrice = false, cb }: ListInputProps) => {
  const [name, setName] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [items, dispatch] = useReducer(reducer, []);
  const { t } = useTranslation();

  useEffect(() => {
    cb(items);
    // eslint-disable-next-line
  }, [items]);

  const handleClick = () => {
    if (withPrice && name && extraPrice) {
      dispatch({ type: "add", payload: { name, extraPrice: Number(extraPrice) } });
      setName("");
      setExtraPrice("");
    } else if (!withPrice && name) {
      dispatch({ type: "add", payload: name });
      setName("");
    }
  };

  return (
    <>
      <Label>{inputName}</Label>
      <InputsWrapper>
        <Input placeholder={t("name")} value={name} onChange={(e) => setName(e.target.value)} />
        {withPrice && (
          <Input
            type="number"
            min={0}
            placeholder={t("extra__price")}
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
          />
        )}
      </InputsWrapper>
      <AddButton onClick={handleClick}>{t("add")}</AddButton>
      {items.length > 0 && (
        <List>
          {items.map((item: any, index: number) => (
            <ListItem key={index}>
              {typeof item === "string" ? item : `${item.name} + ${item.extraPrice} PLN`}
              <img
                src={bin}
                alt="bin"
                onClick={() => {
                  dispatch({ type: "remove", payload: item });
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ListInput;
