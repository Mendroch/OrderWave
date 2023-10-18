import OrdersList from "../../components/molecules/OrdersList/OrdersList";
import { Wrapper } from "./Orders.styles";
import { orders } from "../../constants/orders";

const Orders = () => {
  return (
    <Wrapper>
      <OrdersList orders={orders} />
    </Wrapper>
  );
};

export default Orders;
