import { UseFormRegister } from "react-hook-form";
import { Line, Wrapper } from "./DetailsOption.styles";

interface DetailsOption {
  data: any;
  currency?: string;
  register: UseFormRegister<any>;
  fieldName: string;
  type: string;
  index: number;
}

const DetailsOption = ({ data, currency, register, fieldName, type, index }: DetailsOption) => {
  return (
    <Wrapper htmlFor={data.name}>
      {typeof data === "object" ? (
        <>
          <input
            {...register(fieldName)}
            type={type}
            id={data.name}
            value={index}
            defaultChecked={type === "radio" && index === 0}
          />
          <div>
            <p>{data.name}</p>
            <p>
              + {data.extraPrice} {currency}
            </p>
          </div>
        </>
      ) : (
        <>
          <input
            {...register(fieldName)}
            type={type}
            id={data}
            value={data}
            defaultChecked={type === "radio" && index === 0}
          />
          <div>
            <p>{data}</p>
          </div>
        </>
      )}

      <Line />
    </Wrapper>
  );
};

export default DetailsOption;
