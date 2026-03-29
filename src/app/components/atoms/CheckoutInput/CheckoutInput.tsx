import { ChangeEvent, useEffect, useRef, useImperativeHandle } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input, Label } from "./CheckoutInput.styles";

interface CheckoutInputProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>;
  fieldName: string;
  inputName: string;
  value: string;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  img: string;
  isChecked?: boolean;
}

const CheckoutInput = <T extends FieldValues>({
  register,
  fieldName,
  inputName,
  value,
  selectedOption,
  setSelectedOption,
  img,
  isChecked = false,
}: CheckoutInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register(fieldName as Path<T>);
  const checked = value === selectedOption;

  useImperativeHandle(ref, () => inputRef.current);

  useEffect(() => {
    if (isChecked) setSelectedOption(value);
  }, [isChecked, value, setSelectedOption]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    rest.onChange(e);
    if (inputRef.current) {
      setSelectedOption(inputRef.current.checked ? value : null);
    }
  };

  return (
    <>
      <Input
        {...rest}
        ref={inputRef}
        type="radio"
        id={inputName}
        value={value}
        onChange={handleChange}
        defaultChecked={isChecked}
        required
      />
      <Label htmlFor={inputName} $checked={checked}>
        <img src={img} alt="delivery icon" />
        {inputName}
      </Label>
    </>
  );
};
export default CheckoutInput;
