import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    FlatList,
} from "react-native";
import React, {useContext, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../assets/constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { AuthContext } from "../middleware/AuthContext";
import { useHistoryNavigation } from '../middleware/NavigationHistoryContext'; // Importez le hook personnalisé




const PhotosRoutes = () => (
    <View style={{ flex: 1 }}>
        <FlatList
            data={{uri: 'https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/new-icon.png'}}
            numColumns={3}
            renderItem={({ item, index }) => (
                <View
                    style={{
                        flex: 1,
                        aspectRatio: 1,
                        margin: 3,
                    }}
                >
                    <Image
                        key={index}
                        source={item}
                        style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    />
                </View>
            )}
        />
    </View>
);

const LikesRoutes = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: "blue",
        }}
    />
);



const renderScene = SceneMap({
    1: PhotosRoutes,
    2: LikesRoutes,
});

const Profil = (route) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation();
    const { addRouteToHistory } = useHistoryNavigation();


    useFocusEffect(
        React.useCallback(() => {
            addRouteToHistory('Profil');
        }, [])
    );



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {/*<StatusBar backgroundColor={COLORS.gray} />*/}
            <View style={{ width: "100%", marginTop:-60, }}>
                <Image
                    source={{uri: 'https://images.pexels.com/photos/9816187/pexels-photo-9816187.jpeg?auto=compress&cs=tinysrgb&w=600'}}
                    resizeMode="cover"
                    style={{
                        height: 228,
                        width: "100%",

                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                    resizeMode="contain"
                    style={{
                        height: 155,
                        width: 155,
                        borderRadius: 999,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        marginTop: -90,
                    }}
                />

                <Text
                    style={{

                        color: "brown",
                        marginVertical: 8,
                    }}
                >
                    Nom: {userInfo ? userInfo.nom : 'Chargement...'}
                </Text>
                <Text
                    style={{
                        color: COLORS.black,

                    }}
                >
                    Téléphone: {userInfo ? userInfo.telephone : 'Chargement...'}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 6,
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons name="mail" size={24} color="black" />
                    <Text
                        style={{

                            marginLeft: 4,
                        }}
                    >
                        Email: {userInfo ? userInfo.email : 'Chargement...'}
                    </Text>
                </View>

                <View
                    style={{
                        paddingVertical: 8,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            122
                        </Text>
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            commandes
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            50
                        </Text>
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            copines
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            77
                        </Text>
                        <Text
                            style={{

                                color: '#000000',
                            }}
                        >
                            Vitesse
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Modifier Profil')                }}
                        style={{
                            width: 124,
                            height: 42,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:'#781e1e',
                            borderRadius: 10,
                            marginHorizontal: SIZES.padding * 2,
                        }}
                    >
                        <Text
                            style={{

                                color: COLORS.white,
                            }}
                        >
                            Modifier Profil
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Historique des commandes')                }}
                        style={{
                            width: 124,
                            height: 42,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:'#781e1e',
                            borderRadius: 10,
                            marginHorizontal: SIZES.padding * 2,
                        }}

                    >
                        <Text
                            style={{

                                color: COLORS.white,
                            }}
                        >
                            Dernières commandes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Profil;