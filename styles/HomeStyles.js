import {StyleSheet} from "react-native";
import {COLORS, SIZES} from "../assets/constants/constants";

export const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: 360,
        backgroundColor: '#8A6642',
    },
    searchIcon: {
        color: '#FFFFFF',
    },
    searchInput: {
        flex: 1,
        fontFamily: 'regular',
        paddingRight: 10, // Ajustez selon l'espace nécessaire pour l'icône
        color: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#781e1e',
        marginTop: 20,
        marginRight: 180,
        marginBottom: 20,
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

});
