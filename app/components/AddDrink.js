'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Button from './Button';
import DrinkModal from './DrinkModal';

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
    return <View style={{flex: 1}}>
      <Button
        onPress={this.toggleModal}
      >
        <Text style={Button.defaultTextStyle}>Add Drink</Text>
  
        {this.state.showModal ? <DrinkModal toggleModal={this.toggleModal} submitDrink={this.submitDrink} /> : null}
      </Button>
    </View>;
  }
}

export default connect()(AddDrink);