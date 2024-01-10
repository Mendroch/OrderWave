import { useTranslation } from "react-i18next";
import BackStrip from "../../components/atoms/BackStrip/BackStrip";
import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import { BackStripWrapper, Header } from "./Checkout.styles";
import OrderSummary from "../../components/organisms/OrderSummary/OrderSummary";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";

const Checkout = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const { t } = useTranslation();

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
          </ClientWrapper>
        </>
      )}
    </>
  );
};

export default Checkout;
