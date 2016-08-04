'use strict';

import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {primaryColor} from '../lib/COLORS';

export default class AddDrinkType extends Component {
  constructor() {
    super();
    
    this.openAddModal = this.openAddModal.bind(this);
  }
  
  openAddModal() {
    
  }
  
  render() {
    return <View style={styles.container}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('red')}
        delayPressIn={0}
        onPress={this.openAddModal}
      >
        <View style={styles.button}>
          <Text>Add Drink Type</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}

const styles = {
  container: {
    height: 20
  },
  
  button: {
    flex: 1,
    backgroundColor: primaryColor,
    borderRadius: 2,
    marginHorizontal: 20,
    height: 45,
    padding: 1
  }
};