//
// import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
// import React, { useState, useEffect } from 'react';
// const screenWidth = Dimensions.get('window').width;
//
//
// const Nouveautes = () => {
//     const [nouveautes, setNouveautes] = useState([]);
//
//     useEffect(() => {
//         const fetchNouveautes = async () => {
//             try {
//                 const response = await fetch('https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/lastproducts2');
//                 const jsonData = await response.json();
//                 setNouveautes(jsonData);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des nouveautés:', error);
//             }
//         };
//
//         fetchNouveautes();
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Nouveautés</Text>
//             <View style={styles.nouveautesContainer}>
//                 {nouveautes.map((item, index) => (
//                     <View key={index} style={styles.card}>
//                         <Image source={{ uri: item.url_image }} style={styles.image} onPress />
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//         container: {
//             alignItems: 'center',
//             marginVertical: 20,
//         },
//         title: {
//             fontSize: 23,
//             fontWeight: 'bold',
//             color: '#781e1e',
//             marginTop: 10,
//             marginRight: 170,
//             marginBottom: 20,
//         },
//         nouveautesContainer: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-around',
//         },
//         card: {
//             width: screenWidth / 2 - 30, // Ajustez en fonction de la marge désirée
//             height: 140, // Hauteur des cards
//             borderRadius: 10,
//             overflow: 'hidden',
//             marginBottom: 20,
//         },
//         image: {
//             width: '100%',
//             height: '100%',
//         },
//     });
//
// export default Nouveautes
// Nouveautes.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Nouveautes = ({ navigation }) => {
    const [nouveautes, setNouveautes] = useState([]);

    useEffect(() => {
        const fetchNouveautes = async () => {
            try {
                const response = await fetch('https://gourmandise.mgueye-ba.v70208.campus-centre.fr/api/lastproducts2');
                const jsonData = await response.json();
                setNouveautes(jsonData.map(item => ({...item, key: item.url_image}))); // Assurez-vous que chaque item ait un attribut unique `key`
            } catch (error) {
                console.error('Erreur lors de la récupération des nouveautés:', error);
            }
        };
        fetchNouveautes();
    }, []);

    return (
        <View style={styles.container}>
            {/* View pour le titre et l'image */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom:5 }}>
                <Text style={styles.title}>Nouveautés</Text>
                <Image source={{uri: 'https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/new-icon.png'}}
                       style={{width: 60, height: 60}} />
            </View>

            {/* Container pour les nouveautés */}
            <View style={styles.nouveautesContainer}>
                {nouveautes.map(item => (
                    <TouchableOpacity key={item.reference} onPress={() => navigation.navigate('Produits', { selectedProduct: item})}>

                        <View style={styles.card}>
                            <Image source={{ uri: item.url_image }} style={styles.image} />

                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        alignItems: 'left',
        marginVertical: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#781e1e',
        // marginTop: 15,
        marginRight: 140,
        // marginBottom: 20,
    },
    nouveautesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: screenWidth / 2 - 30,
        height: 140,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Nouveautes;
