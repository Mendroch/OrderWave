import { useTranslation } from "react-i18next";

export const useDaysOfWeek = () => {
  const { t } = useTranslation();

  return [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];
};
