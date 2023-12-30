import { Label, Input, Span } from "./Switch.styles";

interface SwitchProps {
  register: object;
  defaultValue?: boolean;
}

const Switch = ({ register, defaultValue = true }: SwitchProps) => {
  return (
    <Label>
      <Input type="checkbox" {...register} defaultChecked={defaultValue} />
      <Span></Span>
    </Label>
  );
};

export default Switch;
