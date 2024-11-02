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

/**
 * DefaultCategories
 */
export let allCategories = [
  {
    value: 'restaurants',
    label: 'restaurants',
    icon: IoFastFoodOutline,
    color: '#0fa3b1',
    categoryType: 'expenses',
  },
  {
    value: 'grocery',
    label: 'grocery',
    icon: IoCartOutline,
    color: '#f6bd60',
    categoryType: 'expenses',
  },
  {
    value: 'car',
    label: 'car',
    icon: IoCarOutline,
    color: '#b5e2fa',
    categoryType: 'expenses',
  },
  {
    value: 'parking',
    label: 'parking',
    icon: LuParkingCircle,
    color: '#003f88',
    categoryType: 'expenses',
  },
  {
    value: 'transports',
    label: 'transaports',
    icon: IoSubwayOutline,
    color: '#84a98c',
    categoryType: 'expenses',
  },
  {
    value: 'shooping',
    label: 'shooping',
    icon: iconList[4],
    color: '#FFC0CB',
    categoryType: 'expenses',
  },
  {
    value: 'fun',
    label: 'fun',
    icon: IoWineSharp,
    color: '#800080',
    categoryType: 'expenses',
  },
  {
    value: 'house',
    label: 'house',
    icon: IoHomeOutline,
    color: '#c8b6ff',
    categoryType: 'expenses',
  },
  {
    value: 'health',
    label: 'health',
    icon: RiHealthBookLine,
    color: '#f43f5e',
    categoryType: 'expenses',
  },
  {
    value: 'fitness',
    label: 'fitness',
    icon: IoBarbellOutline,
    color: '#fb8b24',
    categoryType: 'expenses',
  },
  {
    value: 'travel',
    label: 'travel',
    icon: IoAirplaneOutline,
    color: '#FF4500',
    categoryType: 'expenses',
  },

  // Income categories
  {
    value: 'rent',
    label: 'rent',
    icon: IoWalletOutline,
    color: '#a4ac86',
    categoryType: 'income',
  },
  {
    value: 'sales',
    label: 'sales percentage',
    icon: TbPercentage,
    color: '#c8b6ff',
    categoryType: 'income',
  },
  {
    value: 'gift',
    label: 'gift',
    icon: IoGiftOutline,
    color: '#ffb6c1',
    categoryType: 'income',
  },
]

export const getCategoryData = (category) => {
  return allCategories.find((cat) => cat.value === category);
};

export const getCategoriesByType = (type) => {
  return allCategories.filter((cat) => cat.categoryType === type);
};

export const getCategoryIcon = (category) => {
  const categoryData = getCategoryData(category);
  return categoryData ? categoryData.icon : IoReceiptOutline;
};

export const getCategoryColor = (category) => {
  const categoryData = getCategoryData(category);
  return categoryData ? categoryData.color : '#FFFFFF'; // Default to white if category not found
};
