import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Header,
  ListItem,
  Text,
  Title,
  Variants,
  Wrapper,
} from "./DishPreview.styles";
import close from "../../../assets/icons/close.png";
import { IDish } from "../../../types/Dishes";
import Shadow from "../../molecules/Shadow/Shadow";

interface DishPreviewProps {
  isOpen: boolean;
  toggle: () => void;
  dish: IDish;
}

const DishPreview = ({ isOpen, toggle, dish }: DishPreviewProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper animate={{ y: isOpen ? -800 : 0 }} transition={{ ease: "easeOut", duration: 0.2 }}>
        <Header>{t("dish__preview")}</Header>
        <Button onClick={toggle}>
          <img src={close} alt="close icon" />
        </Button>
        {dish && (
          <Container>
            <ListItem>
              <Title>{t("name")}</Title>
              <Text>{dish.name}</Text>
            </ListItem>
            {dish.description && (
              <ListItem>
                <Title>{t("description")}</Title>
                <Text>{dish.description}</Text>
              </ListItem>
            )}
            <ListItem>
              <Title>{t("is__available")}</Title>
              <Text>{dish.isAvailable ? t("yes") : t("no")}</Text>
            </ListItem>
            <ListItem>
              <Title>{t("section")}</Title>
              <Text>{dish.section}</Text>
            </ListItem>
            {dish.allergens && (
              <ListItem>
                <Title>{t("allergens")}</Title>
                <Text>
                  {dish.allergens?.map((elem, index) =>
                    dish.allergens && dish.allergens?.length > ++index ? `${elem}, ` : `${elem}`
                  )}
                </Text>
              </ListItem>
            )}
            {dish.variants && (
              <ListItem>
                <Title>{t("variants")}</Title>
                <Variants>
                  {dish.variants?.map((elem, index) => <Text key={index}>{elem.name}</Text>)}
                </Variants>
              </ListItem>
            )}
            {dish.extraIngredients && (
              <ListItem>
                <Title>{t("extra__ingredients")}</Title>
                <Text>
                  {dish.extraIngredients?.map((elem, index) =>
                    dish.extraIngredients && dish.extraIngredients?.length > ++index
                      ? `${elem.name}, `
                      : `${elem.name}`
                  )}
                </Text>
              </ListItem>
            )}
            {dish.removableIngredients && (
              <ListItem>
                <Title>{t("removable__ingredients")}</Title>
                <Text>
                  {dish.removableIngredients?.map((elem, index) =>
                    dish.removableIngredients && dish.removableIngredients?.length > ++index
                      ? `${elem}, `
                      : `${elem}`
                  )}
                </Text>
              </ListItem>
            )}
            {dish.picture && (
              <ListItem>
                <Title>{t("picture")}</Title>
                <img src={`${dish.picture}`} alt="dish picture" />
              </ListItem>
            )}
            <ListItem>
              <Title>{t("price")}</Title>
              <Text>{dish.price} PLN</Text>
            </ListItem>
          </Container>
        )}
      </Wrapper>
      <Shadow isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default DishPreview;
