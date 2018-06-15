import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
	View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

class RoundAddButton extends Component {
	render() {
		return (
      <View>
        <TouchableWithoutFeedback>
          <View style={styles.addCart}>
            <Text style={styles.addCartText}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  addCart: {
    position: 'absolute',
    right: 55,
    bottom: 42,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addCartText: {
    color: '#000',
  },
});

export { RoundAddButton };