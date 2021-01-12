import React from 'react';
import {StyleSheet, Text} from 'react-native';

const DefaultText = (props) => {
    return (
        <Text styles={styles.text}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
    }
});

export default DefaultText;