'use strict';

import moment from 'moment';
import React, {Component} from 'react';
import {Alert, DatePickerAndroid, Text, TextInput, TimePickerAndroid, TouchableNativeFeedback, Modal, Picker, View} from 'react-native';
import {connect} from 'react-redux';
import Button from './Button';
import {grey} from '../lib/COLORS';
import MyModal from './MyModal';

class DrinkModal extends Component {
  /**
   * @param {?Number} props.drinkAmount
   * @param {?Number} props.drinkTime
   * @param {drink[]} props.drinkTypes
   * @param {?String} props.drinkTypeName
   * @param {Function} props.submitDrink
   * @param {Function} props.toggleModal
   */
  constructor(props) {
    super(props);
    const selected = props.drinkTypeName ? props.drinkTypes.findIndex(drink => drink.name === props.drinkTypeName) : 0;
    this.props = props;
    this.state = {
      selected: selected,
      amount: ''+(props.drinkAmount || '1'), //easy way to deal with undefined and convert number to string
      time: props.drinkTime || Date.now()
    };
    
    this.changeAmount = this.changeAmount.bind(this);
    this.editDate = this.editDate.bind(this);
    this.editTime = this.editTime.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  changeAmount(newAmount) {
    const amount = Math.round(newAmount.replace(/[^0-9.]/g, ''));
    
    this.setState({
      amount: amount > 0 ? amount.toString() : ''
    });
  }
  
  editDate() {
    const date = moment(this.state.time);
    
    DatePickerAndroid
      .open({date: +date, maxDate: Date.now()})
      .then(({action, year, month, day}) => {
        if(action === DatePickerAndroid.dismissedAction) return;
      
        this.setState({
          time: +date.set({
            year, 
            month, 
            date: day
          })
        });
      })
      .catch(err => {});
  }
  
  editTime() {
    const time = moment(this.state.time);
    const pickerConfig = {
      hour: time.hour(),
      minute: time.minute()
    };
    
    TimePickerAndroid
      .open(pickerConfig)
      .then(({action, hour, minute}) => {
        if(action === TimePickerAndroid.dismissedAction) return;
        
        this.setState({
          time: +time.set({
            hour,
            minute,
            second: 0
          })
        });
      })
      .catch(err => {});
  }
  
  submit() {
    if(this.state.amount.length === 0) return Alert.alert('Warning', 'Must have a positive amount');
    
    const drink = {
      ...this.props.drinkTypes[this.state.selected],
      created: this.state.time,
      amount: +this.state.amount
    };
    
    this.props.submitDrink(drink);
    this.props.toggleModal();
  }
  
  render() {
    return <MyModal
      isVisible={true}
      toggleModal={this.props.toggleModal}
    >
  
      {/*Drink type*/}
      <View style={styles.modalRow}>
        <Text  style={styles.modalRowLabel}>Drink</Text>
        <Picker
          selectedValue={this.state.selected}
          mode={'dropdown'}
          onValueChange={val => this.setState({selected: val})}
          style={styles.modalRowInput}
        >
          {this.props.drinkTypes.map((drinkType,i) => <Picker.Item label={drinkType.name} value={i} key={drinkType.name}/>)}
        </Picker>
      </View>
  
      {/*Drink Amount*/}
      <View style={styles.modalRow}>
        <Text  style={styles.modalRowLabel}>Amount (oz)</Text>
        <TextInput
          keyboardType={'numeric'}
          value={this.state.amount}
          onChangeText={this.changeAmount}
          style={styles.modalRowInput}
        />
      </View>
  
      {/*Date and Time*/}
      <View style={styles.modalRow}>
    
        {/*Date*/}
        <Button
          buttonColor={grey}
          rippleColor={'white'}
          onPress={this.editDate}
          style={styles.timeButton}
        >
          <Text style={styles.timeButtonText}>{moment(this.state.time).format('MMM D')}</Text>
        </Button>
    
        {/*Time*/}
        <Button
          buttonColor={grey}
          rippleColor={'white'}
          onPress={this.editTime}
          style={styles.timeButton}
        >
          <Text style={styles.timeButtonText}>{moment(this.state.time).format('LT')}</Text>
        </Button>
  
      </View>
      
      <Button onPress={this.submit}>
        <Text style={Button.defaultTextStyle}>Submit</Text>
      </Button>
    </MyModal>;
  }
}

const styles = {
  modalRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5
  },
  
  modalRowLabel: {
    flex: 2,
    textAlignVertical: 'center'
  },
  
  modalRowInput: {
    flex: 4,
    justifyContent: 'center'
  },
  
  timeButton: {
    marginVertical: 1,
    marginHorizontal: 10,
    elevation: 1
  },
  
  timeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
};

export default connect(({drinkTypes}) => ({drinkTypes}))(DrinkModal);