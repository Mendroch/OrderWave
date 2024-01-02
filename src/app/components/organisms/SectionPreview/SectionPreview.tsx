import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Header,
  Hour,
  HoursWrapper,
  ListItem,
  Text,
  Title,
  Wrapper,
} from "../../atoms/PreviewStyles/PreviewStyles.styles";
import close from "../../../assets/icons/close.png";
import Shadow from "../../molecules/Shadow/Shadow";
import { ISection } from "../../../types/Sections";

interface SectionPreviewProps {
  isOpen: boolean;
  toggle: () => void;
  section: ISection;
}

const SectionPreview = ({ isOpen, toggle, section }: SectionPreviewProps) => {
  const { t } = useTranslation();

  const daysOfWeek = [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];

  return (
    <>
      <Wrapper animate={{ y: isOpen ? -800 : 0 }} transition={{ ease: "easeOut", duration: 0.2 }}>
        <Header>{t("section__preview")}</Header>
        <Button onClick={toggle}>
          <img src={close} alt="close icon" />
        </Button>
        {section && (
          <Container>
            <ListItem>
              <Title>{t("name")}</Title>
              <Text>{section.name}</Text>
            </ListItem>
            <ListItem>
              <Title>{t("is__available")}</Title>
              <Text>{section.isAvailable ? t("yes") : t("no")}</Text>
            </ListItem>
            <HoursWrapper>
              <Title>{t("hours_of_availability")}</Title>
              {section.hoursOfAvailability.map(
                (elem: ISection["hoursOfAvailability"][0], index: number) => (
                  <Hour key={index}>
                    <Text>{daysOfWeek[index]}</Text>
                    <Text>
                      {elem.start} - {elem.end}
                    </Text>
                  </Hour>
                )
              )}
            </HoursWrapper>
          </Container>
        )}
      </Wrapper>
      <Shadow isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default SectionPreview;
