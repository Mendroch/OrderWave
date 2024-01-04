import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "../../components/molecules/ListItem/ListItem";
import { Wrapper } from "../../components/atoms/Wrapper/Wrapper.styles";
import { useDeleteSectionMutation, useGetSectionsQuery } from "../../features/section-slice";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import Notification from "../../components/molecules/Notification/Notification";
import Modal from "../../components/organisms/Modal/Modal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import useModal from "../../components/organisms/Modal/useModal";
import Button from "../../components/atoms/Button/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import { ISection } from "../../types/Sections";
import SectionPreview from "../../components/organisms/SectionPreview/SectionPreview";

const Sections = () => {
  const { currentData, isLoading, isError } = useGetSectionsQuery("");
  const [deleteSection] = useDeleteSectionMutation();
  const { t } = useTranslation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    isSuccess: true,
    notification: "",
  });
  const [clickedSectionId, setClickedSectionId] = useState("");
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

  const handleDeleteSection = async (id: string) => {
    try {
      await deleteSection(id).unwrap();
      setNotificationProps({
        isSuccess: true,
        notification: t("notification__section__delete--success"),
      });
      setIsNotificationOpen(true);
    } catch {
      setNotificationProps({
        isSuccess: false,
        notification: t("notification__section__delete--error"),
      });
      setIsNotificationOpen(true);
    }
  };

  const handleClick = (e: any) => {
    const sectionId = e.target.parentNode.parentNode.id;
    if (e.target.parentNode.id && sectionId) {
      setClickedSectionId(sectionId);
      switch (e.target.parentNode.id) {
        case "preview":
          togglePreview();
          break;
        case "edit":
          if (currentData)
            navigate("/owner/editsection", {
              state: {
                sectionData: currentData.find((section: ISection) => section._id === sectionId),
              },
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
          {currentData.map((section: ISection) => (
            <ListItem key={section._id} id={section._id} name={section.name} />
          ))}
          <ActionStripWrapper>
            <NavLink to={"/owner/newsection"}>
              <Button onClick={() => {}}>{t("section__new")}</Button>
            </NavLink>
          </ActionStripWrapper>
          <Notification
            isOpen={isNotificationOpen}
            toggle={() => setIsNotificationOpen(false)}
            props={notificationProps}
          />
          <Modal isOpen={isOpen}>
            <DecisionModal
              question={t("modal__section__delete--question")}
              description={t("modal__section__delete--description")}
              handleClose={handleCloseModal}
              onConfirm={() => handleDeleteSection(clickedSectionId)}
            />
          </Modal>
          <SectionPreview
            isOpen={isPreviewOpen}
            toggle={togglePreview}
            section={currentData.find((elem: ISection) => elem._id === clickedSectionId)}
          />
        </>
      ) : (
        <EmptyInfo>{t("section__noSections")}</EmptyInfo>
      )}
    </Wrapper>
  );
};

export default Sections;
