import React from "react";
import {
    Text,
    View,
    Image,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{backgroundColor: "#6C534E"}}
            >
                <View style={{alignItems: "center"}}>
                    {/*<Text style={{marginBottom: -10, fontSize: 30, color: "#C7D3DD"}}>*/}
                    {/*    GOURMANDISE*/}
                    {/*</Text>*/}
                    <Image
                        source={{uri: "https://cdn.pixabay.com/photo/2017/01/12/02/34/coffee-1973549_1280.jpg"}} // Remplacez par l'URL de votre image
                        style={{
                            height: 250, // Ajustez selon vos besoins
                            width: 300, // Ajustez selon vos besoins
                            // marginBottom: 10,
                        }}
                    />
                </View>
                {/*<View style={{marginBottom: 5}}>*/}
                {/*    <View style={{alignItems: "center"}}>*/}
                {/*        <Text style={{color: "#C7D3DD", fontSize: 20, marginBottom: 5}}>*/}
                {/*            Nom client*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*    <View style={{marginLeft: 5}}>*/}
                {/*        <Text style={{color: "#C7D3DD", fontSize: 12}}>*/}
                {/*            Adresse mail client*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <View style={{flex: 1, backgroundColor: "#fff", paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            {/*<View style={{padding: 10, borderTopWidth: 1, borderTopColor: "#ccc"}}>*/}
            {/*    <TouchableOpacity onPress={() => {*/}
            {/*    }} style={{paddingVertical: 7}}>*/}
            {/*        <View style={{flexDirection: "row"}}>*/}
            {/*            <Text*/}
            {/*                style={{*/}
            {/*                    fontSize: 15,*/}
            {/*                    marginLeft: 10,*/}
            {/*                    marginRight: 10,*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Déconnexion*/}
            {/*            </Text>*/}
            {/*            <Ionicons name="log-out-outline" size={22}/>*/}
            {/*        </View>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    );
};

export default CustomDrawer;
