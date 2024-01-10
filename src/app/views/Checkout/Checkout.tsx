import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import BackStrip from "../../components/atoms/BackStrip/BackStrip";
import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import { BackStripWrapper, ButtonWrapper, Header, Input, Label } from "./Checkout.styles";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";
import DeliveryMethod from "../../components/molecules/DeliveryMethod/DeliveryMethod";
import PaymentMethod from "../../components/molecules/PaymentMethod/PaymentMethod";
import { Fields } from "../../enums/dbFields";
import Button from "../../components/atoms/Button/Button";
import { InputSubmit } from "../../components/atoms/FormStyles/FormStyles.styles";
import { ArrowRight } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import { useCartPrice } from "../../hooks/useCartPrice";
import arrowRight from "../../assets/icons/ArrowRightWhite.png";
import { useAppSelector } from "../../hooks/reduxHooks";
import { convertToOrder } from "../../helpers/convertToOrder";
import { useCreateOrderMutation } from "../../features/order-slice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const cartPrice = useCartPrice();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const cart = useAppSelector((state) => state.cart.dishes);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await createOrder(convertToOrder(data, cart)).unwrap();
      navigate("/client/summary");
    } catch {
      console.log("Error");
    }
  };

  return (
    <>
      {restaurantData && (
        <>
          <BackStripWrapper>
            <BackStrip title={`${t("checkout__back__to")} ${restaurantData[0].name}`} />
          </BackStripWrapper>
          <ClientWrapper>
            <Header>{t("checkout__title")}</Header>
            <OrderSummary restaurantName={restaurantData[0].name} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <DeliveryMethod register={register} />
              <PaymentMethod register={register} />
              <Label htmlFor="clienName">
                <p>{t("checkout__name")}</p>
                <span>*</span>
              </Label>
              <Input {...register(Fields.ClientName)} id="clienName" type="text" required />
              <Label htmlFor="phone">
                <p>{t("checkout__phone")}</p>
                <span>*</span>
              </Label>
              <Input
                {...register(Fields.PhoneNumber)}
                id="phone"
                type="phone"
                placeholder="123 456 789"
                pattern="[0-9]{3}-? ?[0-9]{3}-? ?[0-9]{3}"
                required
              />
              <ButtonWrapper>
                <Button onClick={() => {}}>
                  <InputSubmit type="submit" value="" />
                  {t("menu__to__payment")} {cartPrice} {restaurantData[0].currency}
                  <ArrowRight src={arrowRight} alt="arrow right" />
                </Button>
              </ButtonWrapper>
            </form>
          </ClientWrapper>
        </>
      )}
    </>
  );
};

export default Checkout;
