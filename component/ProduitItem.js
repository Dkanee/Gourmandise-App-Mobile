import { Text, View, Image } from "react-native";
import React from "react";
//import Bag from "../../assets/bag.png";

const ProduitItem = ({ designation, reference, image, prix }) => {
  return (
    <View className="bg-white p-2 justify-center items-center rounded-lg w-full mb-4 border border-slate-200">
      <View className="flex-row justify-center items-center">
        <View className=" items-center justify-center">
          <Image
            source={{
              uri: "https://cdn.discordapp.com/attachments/960898352529178656/1194594131993956372/dkane._logo_gourmandise_entreprise_distribution_de_confiseries__116749b6-b9b5-4b36-bbcf-7453080f0fb7.png?ex=65b0eb7b&is=659e767b&hm=680e1baf0414cca25c702385e6cf49dae9951bfe6d048db097107744ff89a16c&",
            }}
            className="rounded-xl h-20 w-20 object-contain"
          />
        </View>
        <View className="flex-1 w-[100%] p-2">
          <View>
            <Text className="font-bold">{designation}</Text>
            <Text className="text-xs">{reference}</Text>
          </View>
          <View className="mt-2">
            <Text className="text-xs">Prix: ${prix}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProduitItem;
