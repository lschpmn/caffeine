'use strict';

import React, {Component} from 'react';
import {Text, TouchableNativeFeedback , View} from 'react-native';
import {connect} from 'react-redux';
import DrinkModal from './DrinkModal';
import {primaryColor} from '../lib/COLORS';

class AddDrink extends Component {
  /**
   * @param {Redux.Dispatch} props.dispatch
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showModal: false
    };
    
    this.submitDrink = this.submitDrink.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  
  submitDrink(drink) {
    this.props.dispatch({
      type: 'ADD_DRINK',
      drink
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
      
          {this.state.showModal ? <DrinkModal toggleModal={this.toggleModal} submitDrink={this.submitDrink} /> : null}
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

export default connect()(AddDrink);