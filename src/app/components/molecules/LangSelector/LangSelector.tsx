import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../constants";

interface LangSelectorProps {
  toggleNavigation: () => void;
}

const LangSelector = ({ toggleNavigation }: LangSelectorProps) => {
  const { t, i18n } = useTranslation();
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {LANGUAGES.map(({ code }) => (
        <button
          onClick={() => {
            toggleNavigation();
            changeLang(code);
          }}
          key={code}
        >
          {t(`navigation__${code}`)}
        </button>
      ))}
    </>
  );
};

export default LangSelector;
