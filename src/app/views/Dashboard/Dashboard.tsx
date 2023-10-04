import { Link, ButtonWrapper, Header, Paragraph, Wrapper } from "./Dashboard.styles";
import icon from "../../assets/icons/icon.png";

const Dashboard = () => {
  return (
    <Wrapper>
      <Header>
        <p>Welcome to&nbsp;</p>
        <img src={icon} alt="app icon" />
        <p>OrderWave</p>
      </Header>
      <Paragraph>
        Application designed to streamline the process of ordering food, offering customers a
        seamless and enjoyable experience without the need to wait in queues. Furthermore, solution
        significantly enhances the efficiency of restaurant operations.
        <br />
        Choose the right option for you below.
      </Paragraph>
      <ButtonWrapper>
        <Link to="/client/menu">Restaurant Client</Link>
        <Link to="/owner/orders">Restaurant Owner</Link>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Dashboard;
