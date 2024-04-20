import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

        container: {
            flex: 1,
            padding: 21,
            backgroundColor: '#FBFBFB',
        },
        iconContainer:{
            position: 'static',
            //paddingLeft:90,
            top: -30,
            right: -200,
            padding: 5,
            borderRadius: 5,
            zIndex: 1,
        },

        iconTrash:{
            paddingLeft:10,

        },

    iconTrash2: {
        position: 'absolute',
        right: 25, // Ajustez la distance à droite
        bottom: 30, // Ajustez la distance en bas
    },
        card: {
            backgroundColor: '#fff',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        productImage: {
            width: 80, // Ajuster la largeur de l'image
            height: 80, // Ajuster la hauteur de l'image
            borderRadius: 10,
            marginRight: 20,
        },
        articleDetails: {
            flex: 1,
        },
        articleNom: {
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
        },
        prixQuantiteContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap', // Permet le retour à la ligne des éléments
        },
        articlePrix: {
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
            marginBottom: 5, // Ajout d'un espace en bas
        },
        quantiteContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantiteText: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            paddingHorizontal: 10,
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
            width: 50,
            textAlign: 'center',
        },
        totalContainer: {
            marginTop: 20,
            alignItems: 'center',
        },
        totalText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
        },
        checkoutButton: {
            marginTop: 10,
            backgroundColor: '#781e1e',
            paddingVertical: 12,
            paddingHorizontal: 50,
            borderRadius: 5,
        },
        checkoutButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        tumbleweedImage: {
            width: 300,
            height: 300,
            marginBottom: 20,
        },
        panierVide:{
            fontSize: 18,
            fontWeight: 'bold',

        }

});
