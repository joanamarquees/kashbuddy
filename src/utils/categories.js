import {
  IoAirplaneOutline,
  IoBagHandleOutline,
  IoBandageOutline,
  IoBarbellOutline,
  IoAmericanFootballOutline,
  IoBaseballOutline,
  IoBasketballOutline,
  IoBowlingBallOutline,
  IoFootball,
  IoTennisballOutline,
  IoBasketOutline,
  IoBedOutline,
  IoBeerOutline,
  IoBicycleOutline,
  IoBoatOutline,
  IoBookOutline,
  IoBriefcaseOutline,
  IoBrushOutline,
  IoBuildOutline,
  IoBusOutline,
  IoCafeOutline,
  IoCallOutline,
  IoCameraOutline,
  IoCarOutline,
  IoCarSportOutline,
  IoCartOutline,
  IoConstructOutline,
  IoFastFoodOutline,
  IoFilmOutline,
  IoFitnessOutline,
  IoGameControllerOutline,
  IoGiftOutline,
  IoGolfOutline,
  IoHammerOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoPawOutline,
  IoReceiptOutline,
  IoSchoolOutline,
  IoShirtOutline,
  IoStorefrontOutline,
  IoSubwayOutline,
  IoTicketOutline,
  IoWineSharp,
  IoWalletOutline,
} from "react-icons/io5";
import { TbPercentage } from "react-icons/tb";
import { RiHealthBookLine } from "react-icons/ri";
import { LuParkingCircle } from "react-icons/lu";

/** Icons */
export const iconList = [
  //Shooping
  IoBagHandleOutline,
  IoBasketOutline,
  IoCartOutline,
  IoStorefrontOutline,
  IoShirtOutline,
  IoReceiptOutline,
  //Health
  IoBandageOutline,
  IoFitnessOutline,
  RiHealthBookLine,
  IoBarbellOutline,
  IoBicycleOutline,
  IoGolfOutline,
  //Transports
  IoCarOutline,
  IoCarSportOutline,
  IoBoatOutline,
  IoBusOutline,
  IoSubwayOutline,
  IoAirplaneOutline,
  //Sports
  IoBaseballOutline,
  IoAmericanFootballOutline,
  IoBasketballOutline,
  IoBowlingBallOutline,
  IoFootball,
  IoTennisballOutline,
  //Entertainment
  IoCafeOutline,
  IoBeerOutline,
  IoWineSharp,
  IoFilmOutline,
  IoTicketOutline,
  IoBrushOutline,
  //Home
  IoBedOutline,
  IoHomeOutline,
  //Reading
  IoBookOutline,
  IoLibraryOutline,
  //Work
  IoBriefcaseOutline,
  IoSchoolOutline,
  //Construction
  IoBuildOutline, 
  IoHammerOutline,
  IoConstructOutline,
  //Gadgets
  IoCallOutline,
  IoCameraOutline,
  IoGameControllerOutline,
  //Others
  IoFastFoodOutline,
  IoPawOutline,
  IoGiftOutline,
  IoWalletOutline,
  TbPercentage,
  LuParkingCircle,
];

/** Get categories by type */
export const getCategoriesByType = (categories, type) => {
  return categories.filter((category) => category.categoryType === type);
};
