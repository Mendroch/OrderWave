import { Label, Input, Span } from "./Switch.styles";

interface SwitchProps {
  register: object;
}

const Switch = ({ register }: SwitchProps) => {
  return (
    <Label>
      <Input type="checkbox" {...register} />
      <Span></Span>
    </Label>
  );
};

export default Switch;
