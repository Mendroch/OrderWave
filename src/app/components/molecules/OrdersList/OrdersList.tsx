import { Item, Wrapper } from "./OrdersList.styles";
import { IOrder, IOrders } from "../../../types/Orders";

interface OrdersListProps {
  orders: IOrders;
  activeOrderId: string;
  setActiveOrderId: (number: string) => void;
}

const OrdersList = ({ orders, activeOrderId, setActiveOrderId }: OrdersListProps) => {
  return (
    <Wrapper>
      {orders.map((order: IOrder) => (
        <Item
          key={order._id}
          onClick={() => setActiveOrderId(order._id)}
          $isactive={activeOrderId === order._id}
        >
          <p>#{order.number}</p>
        </Item>
      ))}
    </Wrapper>
  );
};

export default OrdersList;
