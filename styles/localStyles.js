import { StyleSheet } from "react-native";

export const localStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize:16,

    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginVertical: 10,
        position: 'relative', // Ajoutez ceci pour permettre le positionnement absolu de l'icône
        // paddingRight: 40, // Assurez-vous d'avoir suffisamment d'espace pour l'icône
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        // Vous pourriez ne pas avoir besoin de paddingRight ici si vous utilisez paddingRight dans le conteneur
    },

    visibilityToggle: {
        position: 'absolute', // Cela permet de placer l'icône au-dessus du conteneur
        right: -40, // Ajustez cela selon la marge que vous voulez avoir entre l'icône et le bord droit du conteneur
        height: '100%', // Assure que le TouchableOpacity remplit le conteneur pour un toucher facile
        padding: 9, // Ajustez le touchable area autour de l'icône

    },
    focusedInput: {
        borderColor: '#4C4CFF',
        borderBottomWidth:2.7,
        borderWidth:1.9,    },
    progressBarContainer: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignSelf: 'flex-start',

    },
});