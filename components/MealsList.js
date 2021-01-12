import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from "./MealItem";
import {useSelector} from "react-redux";
import {CATEGORIES} from "../data/dummy-data";
import {randomColors} from "../Functions/ColorsGenerator";

const MealsList = (props) => {

    const favouriteMeals = useSelector(state => state.meals.favouriteMeals);

    // if (props.catID !== undefined) {
    //     mealColor = (CATEGORIES.find(item => item.id === props.catID)).color;
    // }



    const renderMealItem = (itemData) => {

        const isFavourite = favouriteMeals.some(meal => meal.id === itemData.item.id);

        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealsDetails',
                        params: {
                            mealId: itemData.item.id,
                            cid: props.catID,
                            mealTitle: itemData.item.title,
                            isFav: isFavourite
                        },
                    });
                }}
            />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={styles.meals}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    meals: {
        width: '100%',
        padding: '4%',
    },
});

export default MealsList;