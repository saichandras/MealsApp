import React from 'react';
import MealsList from "../components/MealsList";
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";
import {HeaderButton, HeaderButtons, Item} from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";

const FavouritesScreen = (props) => {

    const favMealsData = useSelector(state => state.meals.favouriteMeals);

    if(favMealsData.length === 0 || !favMealsData){
        return(
            <View style={styles.noMealContent}>
                <DefaultText>No favourite meals found. Start Adding some!</DefaultText>
            </View>
        );
    }

    return (
        <MealsList listData={favMealsData} navigation={props.navigation}/>
    );
};

FavouritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'My Favourites',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    color='white'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    noMealContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default FavouritesScreen;
