'use strict';

import React, {Component} from 'react';
import {Text, TextInput, TouchableNativeFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {primaryColor} from '../lib/COLORS';
import MyModal from './MyModal';

class DrinkTypeModal extends Component {
  /**
   * @param {Function} props.closeModal
   * @param {Number} props.index
   * @param {drinkType[]} props.drinkTypes
   * @param {DrinkTypeSubmit} props.submit
   */
  constructor(props) {
    super(props);
    this.props = props;
    
    if(props.index !== -1) {
      const drinkType = props.drinkTypes[this.props.index];
      
      this.state = {
        drinkInput: drinkType.name,
        drinkAmount: drinkType.mgPerOz
      };
    } else {
      this.state = {
        drinkInput: '',
        drinkAmount: 0
      };
    }
    
    this.submit = this.submit.bind(this);
  }
  
  submit() {
    const drinkType = {
      name: this.state.drinkInput,
      mgPerOz: this.state.drinkAmount
    };
    
    this.props.submit(drinkType);
    this.props.closeModal();
  }
  
  render() {
    return <MyModal 
      isVisible={true} 
      toggleModal={this.props.closeModal}
    >
      {/*Drink name*/}
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Text style={{flex: 1}}>Drink</Text>
    
        <TextInput
          value={this.state.drinkInput}
          onChangeText={newText => this.setState({drinkInput: newText})}
          style={{flex: 3}}
        />
      </View>
  
      {/*Mg per Oz input*/}
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Text style={{flex: 1}}>Mg per Oz</Text>
    
        <TextInput
          value={''+this.state.drinkAmount}
          onChangeText={newText => this.setState({drinkAmount: +newText})}
          style={{flex: 3}}
          keyboardType={'numeric'}
        />
      </View>
  
      {/*Submit*/}
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('red')}
        delayPressIn={0}
        onPress={this.submit}
      >
        <View style={styles.submitButton}>
          <Text>{this.props.index !== -1 ? 'Edit Drink Type' : 'Add Drink Type'}</Text>
        </View>
      </TouchableNativeFeedback>
    </MyModal>;
  }
}

const styles = {
  submitButton: {
    flex: 1,
    backgroundColor: primaryColor,
    borderRadius: 2,
    marginHorizontal: 2,
    marginTop: 10,
    padding: 1
  }
};

export default connect(({drinkTypes}) => ({drinkTypes}))(DrinkTypeModal);

/**
 * @callback DrinkTypeSubmit
 * @param {drinkType} drinkType
 */