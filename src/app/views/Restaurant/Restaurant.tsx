import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmptyInfo } from "../../components/atoms/EmptyInfo/EmptyInfo.styles";
import Notification from "../../components/molecules/Notification/Notification";
import Button from "../../components/atoms/Button/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ActionStripWrapper } from "../../components/atoms/ActionStripWrapper/ActionStripWrapper.styles";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";
import { Closed, Container, Wrapper } from "./Restaurant.styles";
import {
  Hour,
  HoursWrapper,
  ListItem,
  Text,
  Title,
} from "../../components/atoms/PreviewStyles/PreviewStyles.styles";

const Restaurant = () => {
  const { currentData, isLoading, isError } = useGetRestaurantsQuery("");
  const { t } = useTranslation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    isSuccess: true,
    notification: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

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
    console.log(currentData);
  }, [currentData]);

  useEffect(() => {
    if (location.state && location.state.notification) {
      setNotificationProps({ isSuccess: true, notification: location.state.notification });
      setIsNotificationOpen(true);
      navigate(location.pathname, { state: { ...location.state, notification: undefined } });
    }
    // eslint-disable-next-line
  }, [location]);

  if (isError) return <EmptyInfo>{t("error")}</EmptyInfo>;

  if (isLoading) return <EmptyInfo>{t("loading")}</EmptyInfo>;

  return (
    <Wrapper>
      <Container>
        {currentData ? (
          <>
            <ListItem>
              <Title>{t("name")}</Title>
              <Text>{currentData[0].name}</Text>
            </ListItem>
            <ListItem>
              <Title>{t("background")}</Title>
              <img
                style={{ width: "600px", height: "258px" }}
                src="https://picsum.photos/600/258"
                alt="background"
              />
            </ListItem>
            <HoursWrapper>
              <Title>{t("opening_hours")}</Title>
              {daysOfWeek.map((day, index: number) => (
                <Hour key={index}>
                  <Text>{day}</Text>
                  {currentData[0].openDays[index] ? (
                    <Text>
                      {currentData[0].openingHours[index].start} -{" "}
                      {currentData[0].openingHours[index].end}
                    </Text>
                  ) : (
                    <Closed>{t("closed")}</Closed>
                  )}
                </Hour>
              ))}
            </HoursWrapper>
            <ListItem>
              <Text>{t("currency")}</Text>
              <Text>{currentData[0].currency}</Text>
            </ListItem>
            <ActionStripWrapper>
              <NavLink to={"/owner/editrestaurant"}>
                <Button onClick={() => {}}>{t("restaurant__edit")}</Button>
              </NavLink>
            </ActionStripWrapper>
            <Notification
              isOpen={isNotificationOpen}
              toggle={() => setIsNotificationOpen(false)}
              props={notificationProps}
            />
          </>
        ) : (
          <EmptyInfo>{t("restaurant__noRestaurant")}</EmptyInfo>
        )}
      </Container>
    </Wrapper>
  );
};

export default Restaurant;
