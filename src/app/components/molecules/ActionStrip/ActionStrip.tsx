import { useTranslation } from "react-i18next";
import Button from "../../atoms/Button/Button";
import { DeliverMethod, Wrapper } from "./ActionStrip.styles";

interface ActionStripProps {
  deliveryMethod: string;
  tableNumber?: number;
  isActive: boolean;
  onClick: () => void;
}

const ActionStrip = ({ deliveryMethod, tableNumber, isActive, onClick }: ActionStripProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <DeliverMethod>
        {t("orders__deliveryMethod")}: {t(`orders__${deliveryMethod}`)} {tableNumber}
      </DeliverMethod>
      <Button isActive={isActive} onClick={onClick}>
        {t("orders__confirm")}
      </Button>
    </Wrapper>
  );
};

export default ActionStrip;
