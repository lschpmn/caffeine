'use strict';

import React, {Component} from 'react';
import {Text, TouchableNativeFeedback , View} from 'react-native';
import DrinkModal from './DrinkModal';
import {primaryColor} from '../lib/COLORS';

export default class AddDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  
  render() {
    return <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={this.toggleModal}
        background={TouchableNativeFeedback.Ripple('red')}
        delayPressIn={0}
      >
        <View style={styles.button}>
          <Text>Add Drink</Text>
      
          {this.state.showModal ? <DrinkModal toggleModal={this.toggleModal} /> : null}
        </View>
      </TouchableNativeFeedback>
    </View>;
  }
}

const styles = {
  button: {
    backgroundColor: primaryColor,
    borderRadius: 3,
    height: 45,
    marginHorizontal: 20
  },
  
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  
  spacer: {
    flex: 1
  }
};