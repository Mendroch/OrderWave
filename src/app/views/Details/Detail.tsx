import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IDish } from "../../types/Dishes";
import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import {
  ActionWrapper,
  ArrowRight,
  BackButton,
  Header,
  Required,
  Title,
  Wrapper,
} from "./Details.styles";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import DetailsOption from "../../components/molecules/DetailsOption/DetailsOption";
import { Fields } from "../../enums/dbFields";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import { InputSubmit } from "../../components/atoms/FormStyles/FormStyles.styles";
import arrowRight from "../../assets/icons/ArrowRightWhite.png";
import arrowLeft from "../../assets/icons/ArrowLeftPurple.png";
import { calculatePrice } from "../../helpers/calculatePrice";

const Details = () => {
  const { register, watch, handleSubmit } = useForm<IDish>();
  const [dish, setDish] = useState<IDish>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [price, setPrice] = useState(0);
  const watchVariant = watch(Fields.Variant);
  const watchExtraIngredients = watch(Fields.ExtraIngredients);

  useEffect(() => {
    setPrice(calculatePrice(dish, watchVariant, watchExtraIngredients));
  }, [watchVariant, watchExtraIngredients, dish]);

  useEffect(() => {
    if (location.state?.dish) setDish(location.state.dish);
    else navigate("/client/menu");
    // eslint-disable-next-line
  }, [location]);

  const onSubmit: SubmitHandler<IDish> = (data) => {
    console.log(data);
  };

  return (
    <ClientWrapper withBottomPadding={true}>
      {dish && (
        <>
          <Header>
            <p>{dish.name}</p>
            {dish.description && <p>{dish.description}</p>}
          </Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            {dish.variants && (
              <Wrapper>
                <Title>
                  <p>{t("details__variant")}</p>
                  <Required>{t("details__required")}</Required>
                </Title>
                {dish.variants.map((variant, index) => (
                  <DetailsOption
                    data={variant}
                    currency={dish.currency}
                    register={register}
                    fieldName={Fields.Variant}
                    type={"radio"}
                    index={index}
                    key={index}
                  />
                ))}
              </Wrapper>
            )}
            {dish.extraIngredients && (
              <Wrapper>
                <Title>
                  <p>{t("details__add")}</p>
                </Title>
                {dish.extraIngredients.map((ingredient, index) => (
                  <DetailsOption
                    data={ingredient}
                    currency={dish.currency}
                    register={register}
                    fieldName={Fields.ExtraIngredients}
                    type={"checkbox"}
                    index={index}
                    key={index}
                  />
                ))}
              </Wrapper>
            )}
            {dish.removableIngredients && (
              <Wrapper>
                <Title>
                  <p>{t("details__removable")}</p>
                </Title>
                {dish.removableIngredients.map((ingredient, index) => (
                  <DetailsOption
                    data={ingredient}
                    register={register}
                    fieldName={Fields.RemovableIngredients}
                    type={"checkbox"}
                    index={index}
                    key={index}
                  />
                ))}
              </Wrapper>
            )}
            <ActionStripWrapper>
              <ActionWrapper>
                <BackButton to="/client/menu">
                  <img src={arrowLeft} alt="arrow left" />
                </BackButton>
                <Button onClick={() => {}}>
                  <InputSubmit type="submit" value="" />
                  {t("details__add__to__cart")} {price} {dish.currency}
                  <ArrowRight src={arrowRight} alt="arrow right" />
                </Button>
              </ActionWrapper>
            </ActionStripWrapper>
          </form>
        </>
      )}
    </ClientWrapper>
  );
};

export default Details;
