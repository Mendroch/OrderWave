import { IRestaurant } from "../../../types/Restaurants";
import clock from "../../../assets/icons/clock.svg";
import clockred from "../../../assets/icons/clockred.svg";
import { ClockImage, Hour, HoursButton, Red } from "./OpeningHours.styles";
import { useTranslation } from "react-i18next";
import { useDaysOfWeek } from "../../../hooks/useDaysOfWeek";
import { useState } from "react";
import { getDateInfo } from "../../../helpers/getDateInfo";

interface OpeningHoursProps {
  hours: IRestaurant["openingHours"];
  days: IRestaurant["openDays"];
}

const OpeningHours = ({ hours, days }: OpeningHoursProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const daysOfWeek = useDaysOfWeek();
  const { dayNum, fullHour } = getDateInfo();
  const dayHours = hours[dayNum];

  return (
    <>
      {days[dayNum] ? (
        <>
          {dayHours.start <= fullHour && fullHour <= dayHours.end ? (
            <p>
              <ClockImage src={clock} />
              {t("menu__open__today")} {dayHours.start} - {dayHours.end}
            </p>
          ) : (
            <Red>
              <ClockImage src={clockred} />
              {t("menu__closed__today")} {dayHours.start} - {dayHours.end}
            </Red>
          )}
        </>
      ) : (
        <Red>
          <ClockImage src={clockred} />
          {t("closed")}
        </Red>
      )}
      {isOpen ? (
        <>
          {days.map((open, index) => (
            <Hour key={index} $isCurrentDay={index === dayNum}>
              <p>{daysOfWeek[index]}</p>
              <p>{open ? `${hours[index].start} - ${hours[index].end}` : t("closed")}</p>
            </Hour>
          ))}
          <HoursButton onClick={() => setIsOpen(false)}>{t("menu__show__less")}</HoursButton>
        </>
      ) : (
        <HoursButton onClick={() => setIsOpen(true)}>{t("menu__show__hours")}</HoursButton>
      )}
    </>
  );
};

export default OpeningHours;
