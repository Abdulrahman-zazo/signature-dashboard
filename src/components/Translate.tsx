import { useTranslation } from "react-i18next";

interface Iprops {
  text: string;
}
const TranslateText = ({ text }: Iprops) => {
  const { t } = useTranslation();
  return <>{t(`${text}`)}</>;
};

export default TranslateText;
