/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
}

export const Fab = ({ style, onPress, iconName }: Props) => {
  return (
    <View style={{ ...style as any }}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={onPress}
        style={styles.blackButton}
      >
        <Icon
          name={iconName}
          color={'white'}
          size={35}
          style={{ left: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
  },
});
