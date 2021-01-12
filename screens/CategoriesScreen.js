import React from 'react';
import {
    StyleSheet,
    Platform,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CATEGORIES} from '../data/dummy-data';
import colors from '../constants/Colors';
import CategoryGridItem from '../components/CategoryGridItem';
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';

const CategoriesScreen = (props) => {
    const renderItemCategory = (itemData) => {
        return (
            <CategoryGridItem
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() =>
                    props.navigation.navigate({
                        routeName: 'CategoriesMeals',
                        params: {
                            catId: itemData.item.id,
                            mColor: itemData.item.color
                        },
                    })
                }
            />
        );
    };

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderItemCategory}
            keyExtractor={(item, index) => item.id}
        />
    );
};

CategoriesScreen.navigationOptions = (navData) => {

    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    color={Platform.OS === 'android' ? 'white' : colors.primary}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
