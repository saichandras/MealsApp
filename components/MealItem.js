import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    ImageBackground,
} from 'react-native';
import DefaultText from "../components/DefaultText";
import {randomColorGenerator} from "../Functions/ColorsGenerator";

const MealItem = (props) => {

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    let TouchableOpacityCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableOpacityCmp = TouchableNativeFeedback;
    }

    return (
        <View style={{...styles.mealItem,...{backgroundColor: randomColorGenerator() }}}>
            <TouchableOpacityCmp onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground
                            source={{uri: props.image}}
                            style={styles.mealImage}
                            fadeDuration={300}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetails}}>
                        <DefaultText style={styles.mealText}>{props.duration}</DefaultText>
                        <DefaultText style={styles.mealText}>{Capitalize(props.complexity)}</DefaultText>
                        <DefaultText style={styles.mealText}>{Capitalize(props.affordability)}</DefaultText>
                    </View>
                </View>
            </TouchableOpacityCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 12,
    },
    mealRow: {
        flexDirection: 'row',
    },

    mealHeader: {
        height: '85%',
    },

    mealDetails: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: '15%',
        alignItems: 'center',
    },

    mealImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },

    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'white',

        textAlign: 'center',
    },

    mealText: {
        fontFamily: 'open-sans-bold',
    },
});

export default MealItem;
