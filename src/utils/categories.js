import {
  IoFastFoodOutline,
  IoAirplaneOutline,
  IoCartOutline,
  IoCarOutline,
  IoSubwayOutline,
  IoShirtOutline,
  IoWineSharp,
  IoPawOutline,
  IoBarbellOutline,
  IoGiftOutline,
  IoReceiptOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { BsHouseDoor } from "react-icons/bs";
import { TbPercentage } from "react-icons/tb";
import { RiHealthBookLine } from "react-icons/ri";
import { LuParkingCircle } from "react-icons/lu";

/**
 * Categories with their icon and color
 */
export const expensesCategories = [
  {
    value: 'food',
    label: 'diner/lunch',
    icon: IoFastFoodOutline,
    color: '#0fa3b1',
  },
  {
    value: 'grocery',
    label: 'grocery shop',
    icon: IoCartOutline,
    color: '#f6bd60',
  },
  {
    value: 'car',
    label: 'car',
    icon: IoCarOutline,
    color: '#b5e2fa',
  },
  {
    value: 'parking',
    label: 'parking',
    icon: LuParkingCircle,
    color: '#003f88',
  },
  {
    value: 'uber',
    label: 'uber',
    icon: IoSubwayOutline,
    color: '#84a98c',
  },
  {
    value: 'clothes',
    label: 'clothes',
    icon: IoShirtOutline,
    color: '#FFC0CB',
  },
  {
    value: 'fun',
    label: 'fun',
    icon: IoWineSharp,
    color: '#800080',
  },
  {
    value: 'house',
    label: 'house',
    icon: BsHouseDoor,
    color: '#c8b6ff',
  },
  {
    value: 'bunnies',
    label: 'bunnies',
    icon: IoPawOutline,
    color: '#582f0e',
  },
  {
    value: 'health',
    label: 'health',
    icon: RiHealthBookLine,
    color: '#f43f5e',
  },
  {
    value: 'fitness',
    label: 'fitness',
    icon: IoBarbellOutline,
    color: '#fb8b24',
  },
  {
    value: 'travel',
    label: 'travel',
    icon: IoAirplaneOutline,
    color: '#FF4500',
  },
  {
    value: 'other',
    label: 'other',
    icon: IoReceiptOutline,
    color: '#99f6e4',
  },
];

export const incomeCategories = [
  {
    value: 'rent',
    label: 'rent',
    icon: IoWalletOutline,
    color: '#a4ac86',
  },
  {
    value: 'sales',
    label: 'sales percentage',
    icon: TbPercentage,
    color: '#c8b6ff',
  },
  {
    value: 'gift',
    label: 'gift',
    icon: IoGiftOutline,
    color: '#ffb6c1',
  },
  {
    value: 'other',
    label: 'other',
    icon: IoReceiptOutline,
    color: '#99f6e4',
  },
];

const allCategories = [...expensesCategories, ...incomeCategories];

export const getCategoryData = (category) => {
  return allCategories.find((cat) => cat.value === category);
};

export const getCategoryIcon = (category) => {
  const categoryData = getCategoryData(category);
  return categoryData ? categoryData.icon : IoReceiptOutline;
};

export const getCategoryColor = (category) => {
  const categoryData = getCategoryData(category);
  return categoryData ? categoryData.color : '#FFFFFF'; // Default to white if category not found
};
