import { useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import Button from "../../components/atoms/Button/Button";
import {
  Availability,
  Container,
  Header,
  Input,
  InputSubmit,
  Label,
  Margin,
  SelectInput,
  TextArea,
  Wrapper,
} from "../../components/atoms/FormStyles/FormStyles.styles";
import BackStrip from "../../components/atoms/BackStrip/BackStrip";
import { IDish } from "../../types/Dishes";
import Switch from "../../components/atoms/Switch/Switch";
import ListInput from "../../components/organisms/ListInput/ListInput";
import FileInput from "../../components/molecules/FileInput/FileInput";
import { useCreateDishMutation } from "../../features/dish-slice";
import { Fields } from "../../enums/dbFields";
import Modal from "../../components/organisms/Modal/Modal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import useModal from "../../components/organisms/Modal/useModal";
import Notification from "../../components/molecules/Notification/Notification";
import { useNavigate } from "react-router-dom";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const NewDish = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<IDish>();
  const [data, setData] = useState({});
  const [customData, dispatch] = useReducer(reducer, {});
  const [createDish] = useCreateDishMutation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateDish = async () => {
    const mockedData = {
      ...data,
      ...customData,
      pictureType: customData.picture ? customData.picture.match(/data:(\w+\/\w+);base64/)[1] : "",
      sectionId: "650c5e57dcce0bcfca188385",
    };

    try {
      await createDish(mockedData).unwrap();
      navigate("/owner/dishes", {
        state: { notification: t("notification__dish__create--success") },
      });
    } catch {
      setIsNotificationOpen(true);
    }
  };

  const onSubmit: SubmitHandler<IDish> = (data) => {
    setData(data);
    handleOpenModal();
  };

  return (
    <Wrapper>
      <BackStrip title={t("dish__back")} />
      <Header>{t("dish__new__header")}</Header>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>
              {t("name")}
              <span>*</span>
            </Label>
            <Input placeholder={t("name")} {...register(Fields.Name)} required />
            <Margin />
          </div>
          <div>
            <Label>{t("description")}</Label>
            <TextArea placeholder={t("description")} {...register(Fields.Description)} rows={4} />
            <Margin />
          </div>
          <div>
            <Availability>
              <Label>{t("is__available")}</Label>
              <Switch register={{ ...register(Fields.IsAvailable) }} />
            </Availability>
            <Margin />
          </div>
          <div>
            <Label>
              {t("section")}
              <span>*</span>
            </Label>
            <SelectInput {...register(Fields.Section)} required>
              <option value="pizza">pizza</option>
              <option value="burger">burger</option>
              <option value="pasta">pasta</option>
            </SelectInput>
            <Margin />
          </div>
          <div>
            <ListInput
              inputName={t("allergens")}
              cb={(data) => {
                dispatch({ type: Fields.Allergens, payload: data });
              }}
            />
            <Margin />
          </div>
          <div>
            <ListInput
              inputName={t("variants")}
              withPrice={true}
              cb={(data) => {
                dispatch({ type: Fields.Variants, payload: data });
              }}
            />
            <Margin />
          </div>
          <div>
            <ListInput
              inputName={t("extra__ingredients")}
              withPrice={true}
              cb={(data) => {
                dispatch({ type: Fields.ExtraIngredients, payload: data });
              }}
            />
            <Margin />
          </div>
          <div>
            <ListInput
              inputName={t("removable__ingredients")}
              cb={(data) => {
                dispatch({ type: Fields.RemovableIngredients, payload: data });
              }}
            />
            <Margin />
          </div>
          <div>
            <Label>
              {t("picture")}
              <p></p>
            </Label>
            <FileInput
              setImage={(data) => {
                dispatch({ type: Fields.Picture, payload: data });
              }}
            />
            <Margin />
          </div>
          <div>
            <Label>
              {t("price")}
              <span>*</span>
            </Label>
            <Input
              type="number"
              min={0}
              placeholder={t("price")}
              {...register(Fields.Price)}
              required
            />
          </div>
          <ActionStripWrapper>
            <Button onClick={() => {}}>
              <InputSubmit type="submit" value="" />
              {t("dish__confirm__new")}
            </Button>
          </ActionStripWrapper>
        </form>
      </Container>
      <Notification
        isOpen={isNotificationOpen}
        toggle={() => setIsNotificationOpen(false)}
        props={{
          isSuccess: false,
          notification: t("notification__dish__create--error"),
        }}
      />
      <Modal isOpen={isOpen}>
        <DecisionModal
          question={t("modal__dish__create--question")}
          description={t("modal__dish__create--description")}
          handleClose={handleCloseModal}
          onConfirm={handleCreateDish}
        />
      </Modal>
    </Wrapper>
  );
};

export default NewDish;
