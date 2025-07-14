import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../lib/types";

const useNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};

export default useNav;
