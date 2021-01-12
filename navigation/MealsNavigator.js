import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavouritesScreen from "../screens/FavouritesScreen";
import {Ionicons} from '@expo/vector-icons';
import MealsDetailsScreen from '../screens/MealsDetailsScreen';
import React from 'react';
import colors from '../constants/Colors';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {enableScreens} from 'react-native-screens';
import {createDrawerNavigator} from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";
import {Text} from 'react-native';

enableScreens();

const DefaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : '',
};


const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {headerTitle: 'Categories'},
        },

        CategoriesMeals: {
            screen: CategoryMealsScreen,
        },
        MealsDetails: MealsDetailsScreen,
    },
    {
        defaultNavigationOptions: DefaultNavigationOptions
    }
);


const FavNavigator = createStackNavigator({
        Favourites: FavouritesScreen,
        MealsDetails: MealsDetailsScreen,
    },
    {
        defaultNavigationOptions: DefaultNavigationOptions,
    }
);

const CusTabBar = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
                );
            },
            tabBarColor: colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
                );
            },
            tabBarColor: colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ?
                <Text style={{fontFamily: 'open-sans-bold'}}>Favourites</Text> : 'Favourites'
        }
    }
};


const MealsTabFavNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(CusTabBar, {
        activeTintColor: 'white',
        shifting: true,
    })
    : createBottomTabNavigator(CusTabBar, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans'
            },
            activeTintColor: 'white'
        },
    })


const FiltersNavigator = createStackNavigator({
        Filters: FiltersScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'Filters'
        },
        defaultNavigationOptions: DefaultNavigationOptions
    }
);


const MainNavigator = createDrawerNavigator({
        MealsAndFav: {
            screen: MealsTabFavNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: {
            activeTintColor: colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
);


export default createAppContainer(MainNavigator);
