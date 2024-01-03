import { ChangeEvent, useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ISection } from "../../../types/Sections";

interface TimeInputProps {
  register: UseFormRegister<ISection>;
  setValue: UseFormSetValue<ISection>;
  watch: UseFormWatch<ISection>;
  index: number;
}

const TimeInput = ({ register, setValue, watch, index }: TimeInputProps) => {
  const [time, setTime] = useState("");
  const name1 = `hoursOfAvailability[${index}].start`;
  const name2 = `hoursOfAvailability[${index}].end`;
  const watchTime1 = watch(name1);
  const watchTime2 = watch(name2);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (time > watchTime2 || (time >= watchTime1 && time > watchTime2)) {
      setValue(name2, time);
      setTime(time);
    }
  };

  return (
    <div>
      <input
        type="time"
        {...register(name1)}
        onChange={(e) => {
          register(name1).onChange(e);
          handleInput(e);
        }}
        required
      />
      <p>-</p>
      <input type="time" {...register(name2)} onChange={handleInput} value={time} required />
    </div>
  );
};

export default TimeInput;
