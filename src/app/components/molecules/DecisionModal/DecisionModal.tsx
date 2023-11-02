import Button from "../../atoms/Button/Button";
import { ButtonsWrapper, CancelButton, Header, Wrapper } from "./DecisionModal.styles";
import { useTranslation } from "react-i18next";

interface DecisionModalProps {
  handleClose: () => void;
  onConfirm: () => void;
  question: string;
  description?: string;
}

const DecisionModal = ({ handleClose, onConfirm, question, description }: DecisionModalProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Header>{question}</Header>
      <p>{description}</p>
      <ButtonsWrapper>
        <CancelButton onClick={handleClose}>{t("modal__cancel")}</CancelButton>
        <Button
          onClick={() => {
            handleClose();
            onConfirm();
          }}
        >
          {t("modal__confirm")}
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default DecisionModal;
