import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";
import {CATEGORIES} from '../data/dummy-data';
import MealsList from "../components/MealsList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
    const categoryID = props.navigation.getParam('catId');

    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const displayedMeals = availableMeals.filter(
        (mealItem) => mealItem.categoryIds.indexOf(categoryID) >= 0
    );

    if(displayedMeals.length === 0){
        return (
            <View style={styles.noMealContent}>
                <DefaultText>No meals found, please edit your filters!</DefaultText>
            </View>
        );
    }

    return (
        <MealsList listData={displayedMeals} navigation={props.navigation} catID = {categoryID}/>
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const selectedCategory = CATEGORIES.find(
        (cat) => cat.id === navigationData.navigation.getParam('catId')
    );

    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
   noMealContent: {
       flex : 1,
       justifyContent : 'center',
       alignItems : 'center',
   },
});

export default CategoryMealsScreen;
