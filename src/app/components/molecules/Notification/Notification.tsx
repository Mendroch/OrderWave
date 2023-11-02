import { useEffect } from "react";
import { Icon, Wrapper } from "./Notification.styles";
import success from "../../../assets/icons/success.png";
import error from "../../../assets/icons/error.png";

interface NotificationProps {
  isOpen: boolean;
  toggle: () => void;
  props: {
    isSuccess: boolean;
    notification: string;
  };
}

const Notification = ({ isOpen, toggle, props }: NotificationProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(toggle, 2000);
    }
  }, [isOpen]);

  return (
    <Wrapper
      $issuccess={props.isSuccess}
      animate={{ x: isOpen ? -280 : 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <Icon src={props.isSuccess ? success : error} alt="Success icon" />
      <p>{props.notification}</p>
    </Wrapper>
  );
};

export default Notification;
