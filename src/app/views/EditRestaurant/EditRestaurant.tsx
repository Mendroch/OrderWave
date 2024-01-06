import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import {
  Container,
  Header,
  Hours,
  Input,
  InputSubmit,
  Label,
  Margin,
  SelectInput,
  SwitchWrapper,
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
import TimeInput from "../../components/molecules/TimeInput/TimeInput";
import { IRestaurant } from "../../types/Restaurants";
import { useUpdateRestaurantsMutation } from "../../features/restaurant-slice";
import FileInput from "../../components/molecules/FileInput/FileInput";
import { useDaysOfWeek } from "../../hooks/useDaysOfWeek";

const EditRestaurant = () => {
  const { t } = useTranslation();
  const { register, setValue, watch, control, handleSubmit } = useForm<IRestaurant>();
  const [data, setData] = useState({});
  const [updateRestaurant] = useUpdateRestaurantsMutation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [oldData, setOldData] = useState<IRestaurant>();
  const daysOfWeek = useDaysOfWeek();
  const openDays = useWatch({ control, name: Fields.OpenDays });

  useEffect(() => {
    if (location.state.restaurantData) setOldData(location.state.restaurantData);
    else navigate("/owner/restaurant");
    // eslint-disable-next-line
  }, [location]);

  const handleEditRestaurant = async () => {
    if (oldData) {
      try {
        await updateRestaurant({ id: oldData._id, data }).unwrap();
        navigate("/owner/restaurant", {
          state: { notification: t("notification__restaurant__edit--success") },
        });
      } catch {
        setIsNotificationOpen(true);
      }
    }
  };

  const onSubmit: SubmitHandler<IRestaurant> = (data) => {
    setData(data);
    handleOpenModal();
  };

  return (
    <Wrapper>
      <BackStrip title={t("restaurant__back")} />
      <Header>{t("restaurant__edit__header")}</Header>
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
              <Label>
                {t("background")}
                <span>*</span>
                <p></p>
              </Label>
              <FileInput
                setImage={(data) => {
                  setValue(Fields.Background, data);
                }}
                defaultValue={(oldData?.background ? oldData.background : "") as string}
                resolution={450}
                isRequired={true}
              />
              <Margin />
            </div>
            <div>
              <Label>
                {t("open_days")}
                <span>*</span>
              </Label>
              {daysOfWeek.map((day, index) => (
                <SwitchWrapper key={index}>
                  <Label>{day}</Label>
                  <Switch
                    register={{ ...register(`${Fields.OpenDays}[${index}]`) }}
                    defaultValue={oldData?.openDays !== undefined ? oldData.openDays[index] : true}
                  />
                </SwitchWrapper>
              ))}
              <Margin />
            </div>
            <div>
              <Label>
                {t("opening_hours")}
                <span>*</span>
              </Label>
              {daysOfWeek.map((day, index) => (
                <Hours
                  key={index}
                  $isdisabled={openDays ? !openDays[index] : !watch(Fields.OpenDays)[index]}
                >
                  <p>{day}</p>
                  <TimeInput
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    index={index}
                    fieldName={Fields.OpeningHours}
                    defaultValue={oldData?.openingHours[index]}
                    isRequired={openDays ? openDays[index] : watch(Fields.OpenDays)[index]}
                  />
                </Hours>
              ))}
              <Margin />
            </div>
            <div>
              <Label>
                {t("currency")}
                <span>*</span>
              </Label>
              <SelectInput
                {...register(Fields.Currency)}
                defaultValue={oldData?.currency ? oldData.currency : ""}
                required
              >
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </SelectInput>
              <Margin />
            </div>
            <ActionStripWrapper>
              <Button onClick={() => {}}>
                <InputSubmit type="submit" value="" />
                {t("restaurant__confirm__edit")}
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
          notification: t("notification__restaurant__edit--error"),
        }}
      />
      <Modal isOpen={isOpen}>
        <DecisionModal
          question={t("modal__restaurant__edit--question")}
          description={t("modal__restaurant__edit--description")}
          handleClose={handleCloseModal}
          onConfirm={handleEditRestaurant}
        />
      </Modal>
    </Wrapper>
  );
};

export default EditRestaurant;
