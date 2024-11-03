import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const heightPrecentage = (percentage: number) => {
  return (percentage * deviceHeight) / 100;
};

const widthPrecentage = (percentage: number) => {
  return (percentage * deviceWidth) / 100;
};

export { heightPrecentage, widthPrecentage };
