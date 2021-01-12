import React, {useEffect, useCallback} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import {Chip} from "react-native-paper";
import {toggleFavorite} from "../store/actions/meals";
import {CATEGORIES} from '../data/dummy-data';
import {randomColorGenerator} from "../Functions/ColorsGenerator";
import colors from '../constants/Colors';

const MealsDetailsScreen = (props) => {

    // const categoryID = props.navigation.getParam('cid');
    // let mealColor = '';
    // if (categoryID !== undefined) {
    //     mealColor = (CATEGORIES.find(item => item.id === categoryID)).color;
    // }

    const ListItem = (props) => {
        return (
            <View style={styles.listItem}>
                <DefaultText>{props.children}</DefaultText>
            </View>
        );
    };

    function Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const mealID = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.meals.meals)
    const selectedMeal = availableMeals.find(meal => meal.id === mealID);
    const currentFavouriteMeals = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealID));
    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealID));
    }, [dispatch, mealID]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler});
    }, [toggleFavouriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentFavouriteMeals});
    }, [currentFavouriteMeals]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={styles.mealContent}>{selectedMeal.duration}</Text>
                <Text style={styles.mealContent}>{Capitalize(selectedMeal.complexity)}</Text>
                <Text style={styles.mealContent}>{Capitalize(selectedMeal.affordability)}</Text>
            </View>
            <Text style={{...styles.mealText, ...styles.title}}>Ingredients</Text>
            <View style={styles.chips}>
                {selectedMeal.ingredients.map(ingredient =>
                    <Chip
                        style={{...styles.inChip, ...{backgroundColor: 'white' }}}
                        textStyle={styles.chipTextStyle}
                        mode='outlined'
                        height={30}
                        key={ingredient}>
                        {ingredient}
                    </Chip>
                )}
            </View>
            <Text style={{...styles.mealText, ...styles.title}}>Preparation</Text>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    );
};

MealsDetailsScreen.navigationOptions = (navigationData) => {

    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavourite = navigationData.navigation.getParam('toggleFav');
    const isFavourite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Fav'
                iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
                onPress={toggleFavourite}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 5,
    },
    chips: {
        margin: 3,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    inChip: {
        margin: 2,
    },
    chipTextStyle: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'open-sans-bold'
    },
    container: {
        flex: 1,
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    mealContent:{
        fontFamily: 'open-sans-bold'
    }
});

export default MealsDetailsScreen;
