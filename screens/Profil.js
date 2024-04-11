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
import { AuthContext } from "../middleware/AuthContext";


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

const Profil = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const { userInfo } = useContext(AuthContext);

    const [routes] = useState([
        { key: "1", title: "Dernières commandes" },
        { key: "2", title: "Wishlist" },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: '#ffffff',
            }}
            style={{
                backgroundColor: '#781e1e',
                height: 60,
            }}
            renderLabel={({ focused, route }) => (
                <Text style={{ color:"#ffffff",}}>
                    {route.title}
                </Text>
            )}
        />
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
                    source={{uri: 'https://avatars.githubusercontent.com/u/86519238?v=4'}}
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
                        style={{
                            width: 124,
                            height: 36,
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

                    <TouchableOpacity
                        style={{
                            width: 124,
                            height: 36,
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
                            on verra
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, marginHorizontal: 50, marginTop: 20 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={renderTabBar}
                />
            </View>
        </SafeAreaView>
    );
};

export default Profil;