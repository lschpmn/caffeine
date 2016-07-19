'use strict';

import moment from 'moment';
import React, {Component} from 'react';
import {Alert, DatePickerAndroid, Text, TextInput, TimePickerAndroid, TouchableNativeFeedback, Modal, Picker, View} from 'react-native';
import {connect} from 'react-redux';
import {primaryColor, grey, white} from '../lib/COLORS';

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
    return <Modal
      onRequestClose={() => {}}
      visible={this.state.showModal}
      transparent={true}
    >
  
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
      
          {/*modal close button*/}
          <View style={styles.close}>
            <Text style={styles.closeButton} onPress={this.props.toggleModal}>Close</Text>
          </View>
      
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
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('red')}
              delayPressIn={0}
              onPress={this.editDate}
            >
              <View style={styles.button}>
                <Text>{moment(this.state.time).format('MMM D')}</Text>
              </View>
            </TouchableNativeFeedback>
  
            {/*Time*/}
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('red')}
              delayPressIn={0}
              onPress={this.editTime}
            >
              <View style={styles.button}>
                <Text>{moment(this.state.time).format('LT')}</Text>
              </View>
            </TouchableNativeFeedback>
            
          </View>
  
          {/*Submit*/}
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('red')}
            delayPressIn={0}
            onPress={this.submit}
          >
            <View style={styles.submitButton}>
              <Text>{this.props.drinkTypeName ? 'Edit Drink' : 'Add Drink'}</Text>
            </View>
          </TouchableNativeFeedback>
    
        </View>
      </View>

    </Modal>
  }
}

const styles = {
  button: {
    flex: 1,
    backgroundColor: grey,
    borderRadius: 2,
    marginHorizontal: 20,
    padding: 5
  },
  
  close: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  
  closeButton: {
    color: 'red'
  },
  
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  
  modal: {
    backgroundColor: white,
    padding: 20,
    margin: 10,
    borderRadius: 10
  },
  
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
    flex: 3
  },
  
  submitButton: {
    flex: 1,
    backgroundColor: primaryColor,
    borderRadius: 2,
    marginHorizontal: 2,
    marginTop: 10,
    padding: 1
  }
};

export default connect(({drinkTypes}) => ({drinkTypes}))(DrinkModal);