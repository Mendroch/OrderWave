export const getDateInfo = () => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const dayNum = day !== 0 ? day - 1 : 6;
  const addZero = (time: number) => (time < 10 ? `0${time}` : `${time}`);
  const fullHour = `${addZero(hour)}:${addZero(minutes)}`;

  return { dayNum, fullHour };
};
