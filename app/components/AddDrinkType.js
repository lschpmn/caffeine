'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Button from './Button';
import DrinkTypeModal from '../components/DrinkTypeModal';

class AddDrinkType extends Component {
  /**
   * @param {Redux.Dispatch} props.dispatch
   */
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    
    this.addDrinkType = this.addDrinkType.bind(this);
  }
  
  /**
   * @param {drinkType} drinkType
   */
  addDrinkType(drinkType) {
    this.props.dispatch({
      type: 'ADD_DRINK_TYPE',
      drinkType
    });
  }
  
  render() {
    const configuredModal = <DrinkTypeModal 
      closeModal={() => this.setState({modalVisible: false})}
      index={-1}
      submit={this.addDrinkType}
    />;
    
    return <View style={{flex: 1}}>
      <Button
        onPress={() => this.setState({modalVisible: true})}
      >
        <Text style={Button.defaultTextStyle}>Add Drink Type</Text>
  
        {this.state.modalVisible ? configuredModal : null}
      </Button>
    </View>
  }
}

export default connect()(AddDrinkType);