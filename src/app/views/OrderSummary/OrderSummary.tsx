import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import Shadow from "../../components/molecules/Shadow/Shadow";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clear } from "../../features/cart-slice";
import {
  Header,
  Subtitle,
  NumberCard,
  NumberText,
  NoticeCard,
  NoticeText,
  DetailsCard,
  DetailsTitle,
  DetailsRow,
  Bold,
  DishesList,
  DishItem,
  NewOrderButton,
  ActionSheet,
  SheetActionButton,
  SheetDivider,
  DetailsSection,
  DetailsDivider,
} from "./OrderSummary.styles";
import { useGetOrdersQuery } from "../../features/order-slice";
import { IOrderedDish } from "../../types/Orders";

interface IOrderDish {
  name: string;
  amound?: number;
  price?: number;
  currency?: string;
  variant?: string;
  extraIngredients?: string[];
  removableIngredients?: string[];
  totalPrice?: number;
}

interface IClientOrder {
  number: number;
  clientName?: string;
  deliveryMethod?: string;
  phoneNumber?: string;
  tableNumber?: string;
  createdAt?: string;
  restaurantName?: string;
  dishesList: IOrderDish[];
}

const OrderSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.dishes);
  const { currentData: orders } = useGetOrdersQuery("");

  const locationOrder = (location.state as { order?: IClientOrder })?.order;

  useEffect(() => {
    if (locationOrder && cart.length > 0) {
      dispatch(clear());
    }
  }, [locationOrder, cart.length, dispatch]);

  const order = useMemo<IClientOrder | null>(() => {
    if (locationOrder) return locationOrder;

    if (cart.length) {
      return {
        number: Math.floor(Math.random() * 100000),
        createdAt: new Date().toISOString(),
        restaurantName: "",
        dishesList: cart.map((dish) => ({
          name: dish.name,
          amound: dish.amound,
          price: dish.price,
          currency: dish.currency,
          totalPrice: dish.price * dish.amound,
        })),
      };
    }

    if (orders && orders.length > 0) {
      const latestOrder = [...orders].sort((a, b) => b.number - a.number)[0];
      return {
        number: latestOrder.number,
        clientName: latestOrder.clientName,
        deliveryMethod: latestOrder.deliveryMethod,
        phoneNumber: latestOrder.phoneNumber,
        tableNumber: latestOrder.tableNumber,
        restaurantName: "",
        createdAt: "",
        dishesList: latestOrder.dishesList.map((dish: IOrderedDish) => ({
          name: dish.name,
          amound: 1,
          price: 0,
          currency: "",
          variant: dish.variant || "",
          extraIngredients: dish.extraIngredients || [],
          removableIngredients: dish.removableIngredients || [],
          totalPrice: 0,
        })),
      };
    }

    return null;
  }, [locationOrder, cart, orders]);

  useEffect(() => {
    if (!order) {
      return;
    }
  }, [order]);


  if (!order) {
    return (
      <ClientWrapper>
        <Header>{t("summary__noOrder")} </Header>
        <NewOrderButton $isOpen={isSheetOpen} onClick={() => navigate("/client/menu")}>{t("summary__newOrder")}</NewOrderButton>
      </ClientWrapper>
    );
  }

  const parsedDate = order.createdAt ? new Date(order.createdAt) : new Date();
  const formattedDate = `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const totalItemCount = order.dishesList.reduce((acc, dish) => acc + (dish.amound ?? 1), 0);
  const totalPrice = order.dishesList.reduce(
    (acc, dish) =>
      acc + ((dish.totalPrice ?? ((dish.price ?? 0) * (dish.amound ?? 1))) as number),
    0
  );
  const currency = order.dishesList[0]?.currency || "";

  const handleNewOrderConfirm = () => {
    setIsSheetOpen(false);
    navigate("/client/menu");
  };

  return (
    <>
      <ClientWrapper withBottomPadding>
        <Header>{t("summary__thankyou", { restaurant: order.restaurantName || "" })}</Header>
        <Subtitle>{t("summary__intro")}</Subtitle>

        <NumberCard>
          <Bold>{t("summary__orderNumber")}</Bold>
          <NumberText>#{order.number}</NumberText>
        </NumberCard>

        <NoticeCard>
          <NoticeText>{t("summary__statusText")}</NoticeText>
        </NoticeCard>

        <DetailsCard>
          <DetailsTitle>{t("summary__details")}</DetailsTitle>

          <DetailsSection>
            <DetailsRow>
              <span>{formattedDate}</span>
              <span />
            </DetailsRow>
          </DetailsSection>

          <DetailsDivider />

          <DetailsSection>
            <DetailsRow>
              <span>{t("summary__pickupPoint")}</span>
              <span>{t("summary__pickupPointDesc")}</span>
            </DetailsRow>
            <DetailsRow>
              <span>{t("summary__reference")}</span>
              <Bold>{order.number}</Bold>
            </DetailsRow>
          </DetailsSection>

          <DetailsDivider />

          <DetailsSection>
            <DetailsRow>
              <span>{t("summary__items", { value: totalItemCount })}</span>
              <span>{t("summary__wares")}</span>
            </DetailsRow>
            <DishesList>
              {order.dishesList.map((dish, idx) => (
                <DishItem key={`${dish.name}-${idx}`}>
                  <span>{dish.name} x {dish.amound ?? 1}</span>
                  <span>{((dish.price ?? 0) * (dish.amound ?? 1)).toFixed(2)} {dish.currency || currency}</span>
                </DishItem>
              ))}
            </DishesList>
          </DetailsSection>

          <DetailsDivider />

          <DetailsSection>
            <DetailsRow>
              <span>{t("summary__total")}</span>
              <Bold>{totalPrice.toFixed(2)} {currency}</Bold>
            </DetailsRow>
          </DetailsSection>
        </DetailsCard>
      </ClientWrapper>

      <NewOrderButton $isOpen={isSheetOpen} onClick={() => setIsSheetOpen(true)}>{t("summary__newOrder")}</NewOrderButton>

      <ActionSheet
        initial={{ y: "100%" }}
        animate={{ y: isSheetOpen ? "0%" : "100%" }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      >
        <SheetActionButton onClick={handleNewOrderConfirm}>{t("summary__newOrder")}</SheetActionButton>
        <SheetDivider />
        <SheetActionButton onClick={() => setIsSheetOpen(false)}>{t("modal__cancel")}</SheetActionButton>
      </ActionSheet>

      <Shadow isOpen={isSheetOpen} toggle={() => setIsSheetOpen(false)} />
    </>
  );
};

export default OrderSummary;
