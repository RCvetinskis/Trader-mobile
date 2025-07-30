import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../lib/types";

const useNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};
export const useRouteParams = <T extends keyof RootStackParamList>(routeName: T) => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};
export default useNav;
