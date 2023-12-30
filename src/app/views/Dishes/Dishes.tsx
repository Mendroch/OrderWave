import { useEffect, useState } from "react";
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
import Button from "../../components/atoms/Button/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";

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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.notification) {
      setNotificationProps({ isSuccess: true, notification: location.state.notification });
      setIsNotificationOpen(true);
      navigate(location.pathname, { state: { ...location.state, notification: undefined } });
    }
    // eslint-disable-next-line
  }, [location]);

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  const handleDeleteDish = async (id: string) => {
    try {
      await deleteDish(id).unwrap();
      setNotificationProps({ isSuccess: true, notification: t("dish__delete--success") });
      setIsNotificationOpen(true);
    } catch {
      setNotificationProps({ isSuccess: false, notification: t("dish__delete--error") });
      setIsNotificationOpen(true);
    }
  };

  const handleClick = (e: any) => {
    const dishId = e.target.parentNode.parentNode.id;
    if (e.target.parentNode.id && dishId) {
      setClickedDishId(dishId);
      switch (e.target.parentNode.id) {
        case "preview":
          togglePreview();
          break;
        case "edit":
          if (currentData)
            navigate("/owner/editdish", {
              state: { dishData: currentData.find((dish: IDish) => dish._id === dishId) },
            });
          break;
        case "delete":
          handleOpenModal();
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
          <ActionStripWrapper>
            <NavLink to={"/owner/newdish"}>
              <Button onClick={() => {}}>{t("dish__new")}</Button>
            </NavLink>
          </ActionStripWrapper>
          <Notification
            isOpen={isNotificationOpen}
            toggle={() => setIsNotificationOpen(false)}
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
