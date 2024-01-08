import { getDateInfo } from "../helpers/getDateInfo";
import { ISection } from "../types/Sections";
import { IRestaurant } from "../types/Restaurants";

export const useCheckAvailability = () => {
  const { dayNum, fullHour } = getDateInfo();

  const isSectionAvailable = (section: ISection, restaurant: IRestaurant) => {
    if (!restaurant.openDays[dayNum]) return false;
    if (!section.isAvailable) return false;
    const sectionHours = section.hoursOfAvailability[dayNum];
    const restaurantHours = restaurant.openingHours[dayNum];
    return (
      sectionHours.start <= fullHour &&
      fullHour <= sectionHours.end &&
      restaurantHours.start <= fullHour &&
      fullHour <= restaurantHours.end
    );
  };

  return isSectionAvailable;
};
