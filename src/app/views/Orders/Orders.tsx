import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OrderDishes, Wrapper } from "./Orders.styles";
import OrdersList from "../../components/molecules/OrdersList/OrdersList";
import OrderDish from "../../components/molecules/OrderDish/OrderDish";
import { orders } from "../../constants/orders";
import ActionStrip from "../../components/molecules/ActionStrip/ActionStrip";
import { checkActivity } from "../../helpers/checkActivity";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import { IOrder, IOrderedDish } from "../../types/Orders";

const Orders = () => {
  const [activeOrderId, setActiveOrderId] = useState(orders[0]?._id);
  const [activeOrder, setActiveOrder] = useState({} as IOrder);
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let order = orders.find((order) => order._id === activeOrderId);
    if (order) {
      setActiveOrder(order);
      setIsActive(false);
    }
  }, [activeOrderId]);

  return (
    <Wrapper>
      {orders.length > 0 ? (
        <OrdersList
          orders={orders}
          activeOrderId={activeOrderId}
          setActiveOrderId={setActiveOrderId}
        />
      ) : (
        <EmptyInfo>{t("orders__noOrders")}</EmptyInfo>
      )}
      <div>
        {Object.keys(activeOrder).length > 0 && (
          <>
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
        )}
      </div>
    </Wrapper>
  );
};

export default Orders;
