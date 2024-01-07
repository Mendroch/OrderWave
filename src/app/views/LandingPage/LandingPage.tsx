import { useTranslation } from "react-i18next";
import { Link, ButtonWrapper, Header, Paragraph, Wrapper } from "./LandingPage.styles";
import icon from "../../assets/icons/icon.png";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Header>
        <p>{t("dashboard__welcome")}&nbsp;</p>
        <img src={icon} alt="app icon" />
        <p>OrderWave</p>
      </Header>
      <Paragraph>
        {t("dashboard__text--top")}
        <br />
        {t("dashboard__text--bottom")}
      </Paragraph>
      <ButtonWrapper>
        <Link to="/client/menu">{t("dashboard__client")}</Link>
        <Link to="/owner/orders">{t("dashboard__owner")}</Link>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default LandingPage;
