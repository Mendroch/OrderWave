import { useEffect, useRef, useImperativeHandle } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input, Label } from "./CheckoutInput.styles";

interface CheckoutInputProps {
  register: UseFormRegister<any>;
  fieldName: string;
  inputName: string;
  value: string;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  img: string;
  isChecked?: boolean;
}

const CheckoutInput = ({
  register,
  fieldName,
  inputName,
  value,
  selectedOption,
  setSelectedOption,
  img,
  isChecked = false,
}: CheckoutInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register(fieldName);
  const checked = inputName === selectedOption;

  useImperativeHandle(ref, () => inputRef.current);

  useEffect(() => {
    if (isChecked) setSelectedOption(inputName);
    // eslint-disable-next-line
  }, []);

  const handleChange = () => {
    if (inputRef.current) {
      setSelectedOption(inputRef.current.checked ? inputName : null);
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
