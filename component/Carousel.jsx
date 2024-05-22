import React, { useState, useEffect, useRef } from 'react';
import {View, FlatList, Dimensions, Image, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = () => {
    const [index, setIndex] = useState(0);
    const ref = useRef(null);
    const images = [
        'https://images.pexels.com/photos/9816187/pexels-photo-9816187.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600',

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => {
                const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
                if (ref.current) {
                    ref.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                    });
                }
                return nextIndex;
            });
        }, 5000); // Change l'image toutes les 3 secondes

        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    return (
        <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
        <FlatList
            ref={ref}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={screenWidth - 60 + 20}
            contentContainerStyle={styles.carouselContainer}
        />
        </ScrollView>
        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    carouselContainer: {
        alignItems: 'center',
        paddingTop: 15,
    },
    itemContainer: {
        width: screenWidth - 60,
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
});

export default MyCarousel;
