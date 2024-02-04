import { StyleSheet } from "react-native";
import { red } from "react-native-reanimated/src";
export const styles = StyleSheet.create({
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: '#582900',
    paddingTop: 55,
    height : 90,
  },
  titleNav: {
    fontSize: 18,
    marginLeft: 10,
    color:'white',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const products = StyleSheet.create({
  productItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    // Ajoutez vos propres styles ici
  },
});