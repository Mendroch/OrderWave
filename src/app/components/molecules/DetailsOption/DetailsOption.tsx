import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Line, Wrapper } from "./DetailsOption.styles";

interface DetailsOptionProps<T extends FieldValues = FieldValues> {
  data: string | { name: string; extraPrice: number };
  currency?: string;
  register: UseFormRegister<T>;
  fieldName: string;
  type: string;
  index: number;
}

const DetailsOption = <T extends FieldValues>({
  data,
  currency,
  register,
  fieldName,
  type,
  index,
}: DetailsOptionProps<T>) => {
  return (
    <Wrapper htmlFor={typeof data === "string" ? data : data.name}>
      {typeof data === "object" ? (
        <>
          <input
            {...register(fieldName as Path<T>)}
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
            {...register(fieldName as Path<T>)}
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
