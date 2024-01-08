import ClientWrapper from "../../components/atoms/ClientWrapper/ClientWrapper";
import Menu from "../../components/molecules/Menu/Menu";
import OpeningHours from "../../components/organisms/OpeningHours/OpeningHours";
import { useGetDishesQuery } from "../../features/dish-slice";
import { useGetRestaurantsQuery } from "../../features/restaurant-slice";
import { useGetSectionsQuery } from "../../features/section-slice";
import { IDish, IDishes } from "../../types/Dishes";
import { ISection, ISections } from "../../types/Sections";
import { Background, RestaurantName } from "./Dashboard.styles";
import Section from "../../components/organisms/Section/Section";

const Dashboard = () => {
  const { currentData: restaurantData } = useGetRestaurantsQuery("");
  const { currentData: dishesData } = useGetDishesQuery("");
  const { currentData: sectionsData } = useGetSectionsQuery("");

  const usedSections = sectionsData?.reduce((sections: ISections, section: ISection) => {
    return dishesData?.some((dish: IDish) => dish.sectionId === section._id)
      ? [...sections, section]
      : sections;
  }, []);

  return (
    <>
      {restaurantData && dishesData && sectionsData && (
        <ClientWrapper>
          <Background src={restaurantData[0].background} alt="restaurant background" />
          <RestaurantName>{restaurantData[0].name}</RestaurantName>
          <OpeningHours hours={restaurantData[0].openingHours} days={restaurantData[0].openDays} />
          <Menu sections={usedSections} />
          {usedSections.map((section: ISection) => (
            <Section
              section={section}
              dishes={dishesData?.reduce((dishes: IDishes, dish: IDish) => {
                return dish.sectionId === section._id ? [...dishes, dish] : dishes;
              }, [])}
              restaurant={restaurantData[0]}
              key={section._id}
            />
          ))}
        </ClientWrapper>
      )}
    </>
  );
};

export default Dashboard;
