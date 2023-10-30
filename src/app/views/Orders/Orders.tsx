import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OrderDishes, Wrapper } from "./Orders.styles";
import OrdersList from "../../components/molecules/OrdersList/OrdersList";
import OrderDish from "../../components/molecules/OrderDish/OrderDish";
import ActionStrip from "../../components/molecules/ActionStrip/ActionStrip";
import { checkActivity } from "../../helpers/checkActivity";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import { IOrders, IOrder, IOrderedDish } from "../../types/Orders";
import { useGetOrdersQuery } from "../../features/order-slice";

const Orders = () => {
  const { currentData, isLoading, isError } = useGetOrdersQuery("");
  const [activeOrderId, setActiveOrderId] = useState<string>("");
  const [activeOrder, setActiveOrder] = useState<IOrder | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (activeOrderId && currentData) {
      let order = currentData.find((order: IOrder) => order._id === activeOrderId);
      if (order) {
        setActiveOrder(order);
        setIsActive(false);
      }
    }
  }, [activeOrderId, currentData]);

  useEffect(() => {
    if (currentData) setActiveOrderId(currentData[0]?._id);
  }, [currentData]);

  if (isError) return <EmptyInfo>An error has occurred!</EmptyInfo>;

  if (isLoading) return <EmptyInfo>Loading data...</EmptyInfo>;

  return (
    <Wrapper>
      {activeOrder && currentData ? (
        <>
          <OrdersList
            orders={currentData as unknown as IOrders}
            activeOrderId={activeOrderId}
            setActiveOrderId={setActiveOrderId}
          />
          <OrderDishes id="orderDishes" onClick={() => setIsActive(checkActivity)}>
            {activeOrder.dishesList.map((dish: IOrderedDish) => (
              <OrderDish key={dish._id} dish={dish} />
            ))}
          </OrderDishes>
          <ActionStrip
            deliveryMethod={activeOrder.deliveryMethod}
            tableNumber={activeOrder.tableNumber}
            isActive={isActive}
            onClick={isActive ? () => {} : () => {}}
          />
        </>
      ) : (
        <EmptyInfo>{t("orders__noOrders")}</EmptyInfo>
      )}
    </Wrapper>
  );
};

export default Orders;
