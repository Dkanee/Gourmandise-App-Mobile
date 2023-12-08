import { StyleSheet } from "react-native";
import {red} from "react-native-reanimated/src";
export const styles = StyleSheet.create({
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titleNav: {
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
});
