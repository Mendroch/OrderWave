import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OrderDishes, Wrapper } from "./Orders.styles";
import OrdersList from "../../components/molecules/OrdersList/OrdersList";
import OrderDish from "../../components/molecules/OrderDish/OrderDish";
import ActionStrip from "../../components/molecules/ActionStrip/ActionStrip";
import { checkActivity } from "../../helpers/checkActivity";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import { IOrders, IOrder, IOrderedDish } from "../../types/Orders";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../features/order-slice";
import Modal from "../../components/organisms/Modal/Modal";
import useModal from "../../components/organisms/Modal/useModal";
import DecisionModal from "../../components/molecules/DecisionModal/DecisionModal";
import Notification from "../../components/molecules/Notification/Notification";

const Orders = () => {
  const { currentData, isLoading, isError } = useGetOrdersQuery("", {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [activeOrderId, setActiveOrderId] = useState<string>("");
  const [deleteOrder] = useDeleteOrderMutation();
  const [activeOrder, setActiveOrder] = useState<IOrder | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    isSuccess: true,
    notification: "",
  });

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id).unwrap();
      setNotificationProps({ isSuccess: true, notification: t("notification__order--success") });
      toggleNotification();
    } catch {
      setNotificationProps({ isSuccess: false, notification: t("notification__order--error") });
      toggleNotification();
    }
  };

  useEffect(() => {
    if (activeOrderId && currentData) {
      const order = currentData.find((order: IOrder) => order._id === activeOrderId);
      if (order) {
        setActiveOrder(order);
        setIsActive(false);
      }
    }
  }, [activeOrderId, currentData]);

  useEffect(() => {
    if (currentData) setActiveOrderId(currentData[0]?._id);
  }, [currentData]);

  if (isError) return <EmptyInfo>{t("error")}</EmptyInfo>;

  if (isLoading) return <EmptyInfo>{t("loading")}</EmptyInfo>;

  return (
    <Wrapper>
      {activeOrder && currentData ? (
        <>
          <OrdersList
            orders={currentData as unknown as IOrders}
            activeOrderId={activeOrderId}
            setActiveOrderId={setActiveOrderId}
          />
          <OrderDishes id="orderDishes" onClick={() => setIsActive(checkActivity)}>
            {activeOrder.dishesList.map((dish: IOrderedDish) => (
              <OrderDish key={dish._id} dish={dish} />
            ))}
          </OrderDishes>
          <ActionStrip
            deliveryMethod={activeOrder.deliveryMethod}
            tableNumber={activeOrder.tableNumber}
            isActive={isActive}
            onClick={
              isActive
                ? () => {
                    handleOpenModal();
                  }
                : () => {}
            }
          />
          <Notification
            isOpen={isNotificationOpen}
            toggle={toggleNotification}
            props={notificationProps}
          />
          <Modal isOpen={isOpen}>
            <DecisionModal
              question={t("modal__order--question")}
              description={t("modal__order--description")}
              handleClose={handleCloseModal}
              onConfirm={() => handleDeleteOrder(activeOrderId)}
            />
          </Modal>
        </>
      ) : (
        <EmptyInfo>{t("orders__noOrders")}</EmptyInfo>
      )}
    </Wrapper>
  );
};

export default Orders;
