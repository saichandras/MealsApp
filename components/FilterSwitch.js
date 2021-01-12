import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import colors from '../constants/Colors'
import DefaultText from "./DefaultText";


const FilterSwitch = (props) => {

    return(
        <View style={styles.filterContainer}>
            <DefaultText>{props.text}</DefaultText>
            <Switch
                value={props.switchValue}
                onValueChange={props.onSwitchValueChange}
                trackColor={{true: colors.accentColor}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical:10,
    },
});

export default FilterSwitch;