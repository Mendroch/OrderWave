import { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ISection } from "../../../types/Sections";

interface TimeInputProps {
  register: UseFormRegister<ISection>;
  setValue: UseFormSetValue<ISection>;
  watch: UseFormWatch<ISection>;
  index: number;
  defaultValue: { start: string; end: string; _id: string } | undefined;
}

const TimeInput = ({ register, setValue, watch, index, defaultValue }: TimeInputProps) => {
  const [time, setTime] = useState("");
  const name1 = `hoursOfAvailability[${index}].start`;
  const name2 = `hoursOfAvailability[${index}].end`;
  const watchTime1 = watch(name1);
  const watchTime2 = watch(name2);

  useEffect(() => {
    if (defaultValue) {
      setValue(name1, defaultValue.start);
      setValue(name2, defaultValue.end);
      setTime(defaultValue.end);
    }
    // eslint-disable-next-line
  }, []);

  const setTime2 = (time: string) => {
    setValue(name2, time);
    setTime(time);
  };

  return (
    <div>
      <input
        type="time"
        {...register(name1)}
        onChange={(e) => {
          register(name1).onChange(e);
          const time = e.target.value;
          if (time > watchTime2) setTime2(time);
        }}
        required
      />
      <p>-</p>
      <input
        type="time"
        {...register(name2)}
        onChange={(e) => {
          const time = e.target.value;
          if (time >= watchTime1) setTime2(time);
        }}
        value={time}
        required
      />
    </div>
  );
};

export default TimeInput;
