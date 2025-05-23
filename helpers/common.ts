import { Dimensions, PixelRatio } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((percentage * deviceHeight) / 100);
};

const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((percentage * deviceWidth) / 100);
};

export { hp, wp };
