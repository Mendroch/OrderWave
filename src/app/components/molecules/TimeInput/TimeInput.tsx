import { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldValues, Path, PathValue } from "react-hook-form";

interface TimeInputProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  index: number;
  fieldName: string;
  defaultValue?: { start: string; end: string; _id: string } | undefined;
  isRequired?: boolean;
}

const TimeInput = <T extends FieldValues>({
  register,
  setValue,
  watch,
  index,
  fieldName,
  defaultValue,
  isRequired = true,
}: TimeInputProps<T>) => {
  const [time, setTime] = useState("");
  const name1 = `${fieldName}[${index}].start` as Path<T>;
  const name2 = `${fieldName}[${index}].end` as Path<T>;
  const watchTime1 = watch(name1) as string;
  const watchTime2 = watch(name2) as string;

  useEffect(() => {
    if (defaultValue) {
      setValue(name1, defaultValue.start as PathValue<T, Path<T>>);
      setValue(name2, defaultValue.end as PathValue<T, Path<T>>);
      setTime(defaultValue.end);
    }
  }, [defaultValue, name1, name2, setValue]);

  const setTime2 = (time: string) => {
    setValue(name2, time as PathValue<T, Path<T>>);
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
        required={isRequired}
        disabled={!isRequired}
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
        required={isRequired}
        disabled={!isRequired}
      />
    </div>
  );
};

export default TimeInput;
