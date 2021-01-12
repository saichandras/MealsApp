import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const CategoryGridItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.categoryGridItems}>
      <TouchableComponent style={styles.touchableCmp} onPress={props.onSelect}>
        <View
          style={{
            ...styles.categoryContainer,
            ...{ backgroundColor: props.color },
          }}
        >
          <Text numberOfLines={2} style={styles.title}>
            {props.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryGridItems: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 12,
    //overflow: 'hidden',
    overflow: Platform.OS === 'android' && Platform.Version >=21 ? 'hidden' : 'visible',
    elevation: 5,

  },

  touchableCmp: {
    flex: 1,
  },

  categoryContainer: {
    flex: 1,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'right',
  },
});

export default CategoryGridItem;
