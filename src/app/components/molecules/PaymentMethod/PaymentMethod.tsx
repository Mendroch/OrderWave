import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Circle,
  FormHeader,
  OptionsWrapper,
} from "../../atoms/CheckoutStyles/CheckoutStyles.styles";
import { Fields } from "../../../enums/dbFields";
import CheckoutInput from "../../atoms/CheckoutInput/CheckoutInput";
import card from "../../../assets/icons/card.png";
import blik from "../../../assets/icons/blik.png";

interface PaymentMethodProps {
  register: UseFormRegister<any>;
}

const PaymentMethod = ({ register }: PaymentMethodProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div>
      <FormHeader>
        <Circle>
          <p>2</p>
        </Circle>
        <p>{t("checkout__payment__method")}</p>
        <span>*</span>
      </FormHeader>
      <OptionsWrapper>
        <CheckoutInput
          register={register}
          fieldName={Fields.PaymentMethod}
          inputName={t("checkout__card")}
          value={"card"}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          img={card}
          isChecked={true}
        />
        <CheckoutInput
          register={register}
          fieldName={Fields.PaymentMethod}
          inputName={t("checkout__blik")}
          value={"blik"}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          img={blik}
        />
      </OptionsWrapper>
    </div>
  );
};

export default PaymentMethod;
