'use strict';

import React, {Component} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import Button from './Button';
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
  
    if(drinkType.name.length === 0) {
      Alert.alert('Drink Type Needs a Name!');
      return;
    } else if(drinkType.mgPerOz === 0) {
      Alert.alert(`Drink Type Amount can't be 0.`);
      return;
    }
    
    this.props.submit(drinkType);
    this.props.closeModal();
  }
  
  render() {
    return <MyModal 
      isVisible={true} 
      toggleModal={this.props.closeModal}
    >
      {/*Drink name*/}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Drink</Text>
    
        <TextInput
          value={this.state.drinkInput}
          onChangeText={newText => this.setState({drinkInput: newText})}
          style={{flex: 2, justifyContent: 'center'}}
        />
      </View>
  
      {/*Mg per Oz input*/}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Mg per Oz</Text>
    
        <TextInput
          value={''+this.state.drinkAmount}
          onChangeText={newText => this.setState({drinkAmount: +newText})}
          style={{flex: 2, justifyContent: 'center'}}
          keyboardType={'numeric'}
        />
      </View>
  
      {/*Submit*/}
      <Button onPress={this.submit} >
        <Text style={Button.defaultTextStyle}>{this.props.index !== -1 ? 'Edit Drink Type' : 'Add Drink Type'}</Text>
      </Button>
    </MyModal>;
  }
}

export default connect(({drinkTypes}) => ({drinkTypes}))(DrinkTypeModal);

/**
 * @callback DrinkTypeSubmit
 * @param {drinkType} drinkType
 */