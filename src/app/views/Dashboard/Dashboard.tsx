import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import OpeningHours from "../../components/organisms/OpeningHours/OpeningHours";
import { useGetDishesQuery } from "../../features/dish-slice";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";
import { useGetSectionsQuery } from "../../features/section-slice";
import { Background, RestaurantName } from "./Dashboard.styles";

const Dashboard = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const { currentData: dishesData } = useGetDishesQuery("");
  const { currentData: sectionsData } = useGetSectionsQuery("");

  return (
    <>
      {restaurantData && dishesData && sectionsData && (
        <ClientWrapper>
          {<Background src={restaurantData[0].background} alt="restaurant background" />}
          <RestaurantName>{restaurantData[0].name}</RestaurantName>
          <OpeningHours hours={restaurantData[0].openingHours} days={restaurantData[0].openDays} />
        </ClientWrapper>
      )}
    </>
  );
};

export default Dashboard;
