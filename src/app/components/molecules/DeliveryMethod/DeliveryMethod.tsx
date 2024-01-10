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
import { TableNumber } from "../../atoms/CheckoutInput/CheckoutInput.styles";
import table from "../../../assets/icons/table.png";
import pickup from "../../../assets/icons/pickup.png";
import takeaway from "../../../assets/icons/takeaway.png";

interface DeliveryMethodProps {
  register: UseFormRegister<any>;
}

const DeliveryMethod = ({ register }: DeliveryMethodProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div>
      <FormHeader>
        <Circle>
          <p>1</p>
        </Circle>
        <p>{t("checkout__delivery")}</p>
        <span>*</span>
      </FormHeader>
      <OptionsWrapper>
        <CheckoutInput
          register={register}
          fieldName={Fields.DeliveryMethod}
          inputName={t("checkout__table__service")}
          value={"tableService"}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          img={table}
          isChecked={true}
        />
        <CheckoutInput
          register={register}
          fieldName={Fields.DeliveryMethod}
          inputName={t("checkout__pick__up")}
          value={"pickUp"}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          img={pickup}
        />
        <CheckoutInput
          register={register}
          fieldName={Fields.DeliveryMethod}
          inputName={t("checkout__take__away")}
          value={"takeAway"}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          img={takeaway}
        />
      </OptionsWrapper>
      {selectedOption === t("checkout__table__service") && (
        <TableNumber>
          <label>
            {t("checkout__table__number")}
            <span>*</span>
          </label>
          <input {...register(Fields.TableNumber)} type="number" required />
        </TableNumber>
      )}
    </div>
  );
};

export default DeliveryMethod;
