import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import {
  Availability,
  Container,
  Header,
  Hours,
  Input,
  InputSubmit,
  Label,
  Margin,
  Wrapper,
} from "../../components/atoms/FormStyles/FormStyles.styles";
import BackStrip from "../../components/atoms/BackStrip/BackStrip";
import Switch from "../../components/atoms/Switch/Switch";
import { Fields } from "../../enums/dbFields";
import Modal from "../../components/organisms/Modal/Modal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import useModal from "../../components/organisms/Modal/useModal";
import Notification from "../../components/molecules/Notification/Notification";
import { useLocation, useNavigate } from "react-router-dom";
import { ISection } from "../../types/Sections";
import { useUpdateSectionMutation } from "../../features/section-slice";
import TimeInput from "../../components/molecules/TimeInput/TimeInput";

const EditSection = () => {
  const { t } = useTranslation();
  const { register, setValue, watch, handleSubmit } = useForm<ISection>();
  const [data, setData] = useState({});
  const [updateSection] = useUpdateSectionMutation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [oldData, setOldData] = useState<ISection>();

  const daysOfWeek = [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];

  useEffect(() => {
    if (location.state.sectionData) setOldData(location.state.sectionData);
    else navigate("/owner/sections");
    // eslint-disable-next-line
  }, [location]);

  const handleEditSection = async () => {
    if (oldData) {
      try {
        await updateSection({ id: oldData._id, data }).unwrap();
        navigate("/owner/sections", {
          state: { notification: t("notification__section__edit--success") },
        });
      } catch {
        setIsNotificationOpen(true);
      }
    }
  };

  const onSubmit: SubmitHandler<ISection> = (data) => {
    setData(data);
    handleOpenModal();
  };

  return (
    <Wrapper>
      <BackStrip title={t("section__back")} />
      <Header>{t("section__edit__header")}</Header>
      {oldData && (
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>
                {t("name")}
                <span>*</span>
              </Label>
              <Input
                placeholder={t("name")}
                {...register(Fields.Name)}
                required
                defaultValue={oldData?.name ? oldData.name : ""}
              />
              <Margin />
            </div>
            <div>
              <Availability>
                <Label>{t("is__available")}</Label>
                <Switch
                  register={{ ...register(Fields.IsAvailable) }}
                  defaultValue={oldData?.isAvailable !== undefined ? oldData.isAvailable : true}
                />
              </Availability>
              <Margin />
            </div>
            <div>
              <Label>
                {t("hours_of_availability")}
                <span>*</span>
              </Label>
              {daysOfWeek.map((day, index) => (
                <Hours key={index}>
                  <p>{day}</p>
                  <TimeInput
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    index={index}
                    defaultValue={oldData?.hoursOfAvailability[index]}
                  />
                </Hours>
              ))}
              <Margin />
            </div>
            <ActionStripWrapper>
              <Button onClick={() => {}}>
                <InputSubmit type="submit" value="" />
                {t("section__confirm__edit")}
              </Button>
            </ActionStripWrapper>
          </form>
        </Container>
      )}
      <Notification
        isOpen={isNotificationOpen}
        toggle={() => setIsNotificationOpen(false)}
        props={{
          isSuccess: false,
          notification: t("notification__section__edit--error"),
        }}
      />
      <Modal isOpen={isOpen}>
        <DecisionModal
          question={t("modal__section__edit--question")}
          description={t("modal__section__edit--description")}
          handleClose={handleCloseModal}
          onConfirm={handleEditSection}
        />
      </Modal>
    </Wrapper>
  );
};

export default EditSection;
