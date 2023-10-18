import { Wrapper } from "./OrdersList.styles";
import { IOrder, IOrders } from "../../../types/Orders";

interface OrdersListProps {
  orders: IOrders;
}

const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <Wrapper>
      {orders.map((order: IOrder) => (
        <div key={order.number}>
          <p>#{order.number}</p>
        </div>
      ))}
    </Wrapper>
  );
};

export default OrdersList;
