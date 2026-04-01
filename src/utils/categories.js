import {
	IoAirplaneOutline,
	IoAmericanFootballOutline,
	IoBagHandleOutline,
	IoBandageOutline,
	IoBarbellOutline,
	IoBaseballOutline,
	IoBasketballOutline,
	IoBasketOutline,
	IoBedOutline,
	IoBeerOutline,
	IoBicycleOutline,
	IoBoatOutline,
	IoBookOutline,
	IoBowlingBallOutline,
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
	IoFootball,
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
	IoTennisballOutline,
	IoTicketOutline,
	IoWalletOutline,
	IoWineSharp,
} from "react-icons/io5";
import { RiHealthBookLine } from "react-icons/ri";
import { TbParkingCircle, TbPercentage } from "react-icons/tb";

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
	TbParkingCircle,
];

/** Get categories by type */
export const getCategoriesByType = (categories, type) => {
	return categories.filter((category) => category.categoryType === type);
};
