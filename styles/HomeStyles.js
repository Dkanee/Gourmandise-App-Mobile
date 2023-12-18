import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#781e1e",
        textAlign: "center",
        marginTop: 20,
    },
    centeredRectangleTitle: {
        fontSize: 20,
        marginBottom: 7,
        fontWeight: "bold",
        color: "#781e1e",
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    rectangle: {
        backgroundColor: "#E0E0E0",
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        width: "100%",
        borderRadius: 62,
    },
    rectangleTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#781e1e",
    },
    prices: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontSize: 16,
        marginRight: 5,
    },
    centeredRectangle: {
        backgroundColor: "#E0E0E0",
        padding: 20,
        paddingBottom: 10,
        alignItems: "center",
        marginBottom: 20,
        width: "65%",
        marginTop: 15,
        borderRadius: 20,
    },
    button: {
        backgroundColor: "#781e1e",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        alignSelf: "stretch",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        margin: 6,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    bottomButton: {
        backgroundColor: "#781e1e",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
});
