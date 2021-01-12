import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch, Platform} from 'react-native';
import {HeaderButton, HeaderButtons, Item} from "react-navigation-header-buttons";
import FavouritesScreen from "./FavouritesScreen";
import colors from '../constants/Colors'
import FilterSwitch from "../components/FilterSwitch";
import {useDispatch} from "react-redux";
import {setFilers} from "../store/actions/meals";

const FiltersScreen = (props) => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilers(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);


    useEffect(() => {
        navigation.setParams({saveAppliedFilters: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.root}>
            <Text style={styles.title}> Available Filters </Text>
            <FilterSwitch
                text='Gluten-Free'
                switchValue={isGlutenFree}
                onSwitchValueChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                text='Lactose-Free'
                switchValue={isLactoseFree}
                onSwitchValueChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                text='Vegan'
                switchValue={isVegan}
                onSwitchValueChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                text='Vegetarian'
                switchValue={isVegetarian}
                onSwitchValueChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {

    return {
        headerTitle: 'Meal Filters',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    color= {Platform.OS === 'android' ? 'white' : colors.primary}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    color= {Platform.OS === 'android' ? 'white' : colors.primary}
                    onPress={navData.navigation.getParam('saveAppliedFilters')}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    }
});

export default FiltersScreen;
