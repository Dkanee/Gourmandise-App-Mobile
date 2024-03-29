import {Dimensions, StyleSheet} from "react-native";
const screenWidth = Dimensions.get('window').width;
export const stylesProduits = StyleSheet.create({

  closeButtonText: {
    color: 'white',       // Couleur du texte
    fontSize: 18,

  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    width: 50,
    height: 30,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: (screenWidth / 2) - 25, // Centre le bouton sur l'axe X
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  fullScreenModal: {
    flex: 1,
  },
  fullSizeImage: {
    width: '100%',        // Prend toute la largeur de l'écran
    height: 300,          // Hauteur fixe, ajustez selon vos besoins
    resizeMode: 'cover',  // Assure que l'image couvre toute la largeur sans être déforméee
    alignSelf: 'flex-start' // Alignement en haut
  },
  modalContent: {
    padding: 20,
  },
  modalProductName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalProductDescription: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
  modalProductPrice: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  buttonAddToCart: {
    backgroundColor: '#582900',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  container: {
    flex: 1,
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#582900",
  },
  titleNav: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginLeft: -40,
    color: "#FFFFFF",
  },
  menuIcon: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  card: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    height: 120,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 0,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "grey",
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  pageNumberText: {
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
  },

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },


  button: {
    backgroundColor: "#582900",
    padding: 10,
    borderRadius: 5,
  },

  button2: {
    backgroundColor: "#660000",
    padding: 10,
    borderRadius: 5,
  },

  button3: {
    backgroundColor: "#BF3030",
    padding: 10,
    borderRadius: 5,
    marginBottom:5,
  },

  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonClose2: {
    backgroundColor: '#582900',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },

  textStyle2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,

  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',

  },
});
