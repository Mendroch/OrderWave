import { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useUpdateDishMutation } from "../../features/dish-slice";
import { Fields } from "../../enums/dbFields";
import Modal from "../../components/organisms/Modal/Modal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import useModal from "../../components/organisms/Modal/useModal";
import Notification from "../../components/molecules/Notification/Notification";
import { useGetSectionsQuery } from "../../features/section-slice";
import { ISection } from "../../types/Sections";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const EditDish = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<IDish>();
  const [data, setData] = useState({});
  const [customData, dispatch] = useReducer(reducer, {});
  const [updateDish] = useUpdateDishMutation();
  const { currentData: sectionsData } = useGetSectionsQuery("");
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [oldData, setOldData] = useState<IDish>();

  useEffect(() => {
    if (location.state?.dishData) setOldData(location.state.dishData);
    else navigate("/owner/dishes");
    // eslint-disable-next-line
  }, [location]);

  const handleEditDish = async () => {
    if (oldData) {
      try {
        await updateDish({ id: oldData._id, data: { ...data, ...customData } }).unwrap();
        navigate("/owner/dishes", {
          state: { notification: t("notification__dish__edit--success") },
        });
      } catch {
        setIsNotificationOpen(true);
      }
    }
  };

  const onSubmit: SubmitHandler<IDish> = (data) => {
    setData(data);
    handleOpenModal();
  };

  return (
    <Wrapper>
      <BackStrip title={t("dish__back")} />
      <Header>{t("dish__edit__header")}</Header>
      {oldData && sectionsData && (
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
                defaultValue={oldData?.name ? oldData.name : ""}
                required
              />
              <Margin />
            </div>
            <div>
              <Label>{t("description")}</Label>
              <TextArea
                placeholder={t("description")}
                {...register(Fields.Description)}
                rows={4}
                defaultValue={oldData?.description ? oldData.description : ""}
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
                {t("section")}
                <span>*</span>
              </Label>
              <SelectInput
                {...register(Fields.SectionId)}
                defaultValue={oldData?.sectionId ? oldData.sectionId : ""}
                required
              >
                {sectionsData.map((elem: ISection, index: number) => (
                  <option value={elem._id} key={index}>
                    {elem.name}
                  </option>
                ))}
              </SelectInput>
              <Margin />
            </div>
            <div>
              <ListInput
                inputName={t("allergens")}
                withPrice={false}
                cb={(data) => {
                  dispatch({ type: Fields.Allergens, payload: data });
                }}
                defaultValue={oldData?.allergens ? oldData.allergens : []}
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
                defaultValue={oldData?.variants ? oldData.variants : []}
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
                defaultValue={oldData?.extraIngredients ? oldData.extraIngredients : []}
              />
              <Margin />
            </div>
            <div>
              <ListInput
                inputName={t("removable__ingredients")}
                cb={(data) => {
                  dispatch({ type: Fields.RemovableIngredients, payload: data });
                }}
                defaultValue={oldData?.removableIngredients ? oldData.removableIngredients : []}
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
                defaultValue={(oldData?.picture ? oldData.picture : "") as string}
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
                defaultValue={oldData?.price ? oldData.price : ""}
                required
              />
            </div>
            <ActionStripWrapper>
              <Button onClick={() => {}}>
                <InputSubmit type="submit" value="" />
                {t("dish__confirm__edit")}
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
          notification: t("notification__dish__edit--error"),
        }}
      />
      <Modal isOpen={isOpen}>
        <DecisionModal
          question={t("modal__dish__edit--question")}
          description={t("modal__dish__edit--description")}
          handleClose={handleCloseModal}
          onConfirm={handleEditDish}
        />
      </Modal>
    </Wrapper>
  );
};

export default EditDish;
