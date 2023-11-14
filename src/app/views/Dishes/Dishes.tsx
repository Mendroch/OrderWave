import { useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "../../components/molecules/ListItem/ListItem";
import { Wrapper } from "./Dishes.styles";
import { useGetDishesQuery, useDeleteDishMutation } from "../../features/dish-slice";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import { IDish } from "../../types/Dishes";
import Notification from "../../components/molecules/Notification/Notification";
import Modal from "../../components/organisms/Modal/Modal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import useModal from "../../components/organisms/Modal/useModal";
import DishPreview from "../../components/organisms/DishPreview/DishPreview";

const Dishes = () => {
  const { currentData, isLoading, isError } = useGetDishesQuery("");
  const [deleteDish] = useDeleteDishMutation();
  const { t } = useTranslation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    isSuccess: true,
    notification: "",
  });
  const [clickedDishId, setClickedDishId] = useState("");

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  const handleDeleteDish = async (id: string) => {
    try {
      await deleteDish(id).unwrap();
      setNotificationProps({ isSuccess: true, notification: t("dish__delete--success") });
      toggleNotification();
    } catch {
      setNotificationProps({ isSuccess: false, notification: t("dish__delete--error") });
      toggleNotification();
    }
  };

  const handleClick = (e: any) => {
    if (e.target.parentNode.id && e.target.parentNode.parentNode.id) {
      setClickedDishId(e.target.parentNode.parentNode.id);
      switch (e.target.parentNode.id) {
        case "delete":
          handleOpenModal();
          break;
        case "preview":
          togglePreview();
          break;
        default:
          () => {};
      }
    }
  };

  if (isError) return <EmptyInfo>{t("error")}</EmptyInfo>;

  if (isLoading) return <EmptyInfo>{t("loading")}</EmptyInfo>;

  return (
    <Wrapper onClick={handleClick}>
      {currentData ? (
        <>
          {currentData.map((dish: IDish) => (
            <ListItem key={dish._id} id={dish._id} name={dish.name} />
          ))}
          <Notification
            isOpen={isNotificationOpen}
            toggle={toggleNotification}
            props={notificationProps}
          />
          <Modal isOpen={isOpen}>
            <DecisionModal
              question={t("modal__dish__delete--question")}
              description={t("modal__dish__delete--description")}
              handleClose={handleCloseModal}
              onConfirm={() => handleDeleteDish(clickedDishId)}
            />
          </Modal>
          <DishPreview
            isOpen={isPreviewOpen}
            toggle={togglePreview}
            dish={currentData.find((elem: IDish) => elem._id === clickedDishId)}
          />
        </>
      ) : (
        <EmptyInfo>{t("dish__noDishes")}</EmptyInfo>
      )}
    </Wrapper>
  );
};

export default Dishes;
