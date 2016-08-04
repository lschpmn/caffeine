'use strict';

import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {primaryColor} from '../lib/COLORS';
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
    
    return <View style={styles.container}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('red')}
        delayPressIn={0}
        onPress={() => this.setState({modalVisible: true})}
      >
        <View style={styles.button}>
          <Text>Add Drink Type</Text>
          
          {this.state.modalVisible ? configuredModal : null}
          
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}

export default connect()(AddDrinkType);

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