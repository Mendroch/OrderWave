import { useTranslation } from "react-i18next";
import Button from "../../atoms/Button/Button";
import { DeliverMethod } from "./ActionStrip.styles";
import { ActionStripWrapper } from "../../atoms/ActionStripWrapper/ActionStripWrapper.styles";

interface ActionStripProps {
  deliveryMethod: string;
  tableNumber?: string;
  isActive: boolean;
  onClick: () => void;
}

const ActionStrip = ({ deliveryMethod, tableNumber, isActive, onClick }: ActionStripProps) => {
  const { t } = useTranslation();

  return (
    <ActionStripWrapper>
      <DeliverMethod>
        {t("orders__deliveryMethod")}: {t(`orders__${deliveryMethod}`)} {tableNumber}
      </DeliverMethod>
      <Button isActive={isActive} onClick={onClick}>
        {t("orders__confirm")}
      </Button>
    </ActionStripWrapper>
  );
};

export default ActionStrip;
