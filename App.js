import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
import {createStore, combineReducers} from "redux";
import mealsReducer from "./store/reducers/meals";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontsLoaded(true)}
            />
        );
    }

    return (
        <Provider store={store}>
            <MealsNavigator/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
