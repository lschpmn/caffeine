'use strict';

import React, {Component} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {red} from '../lib/COLORS';

export default class Row extends Component {
  /**
   * @param {String} props.topLabel
   * @param {String} props.bottomLabel
   * @param {Function} props.edit
   * @param {Function} props.delete
   */
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
    return <View style={{...styles.row}} elevation={3}>
      <View style={{flex: 5}}>
        <Text>{this.props.topLabel}</Text>
        <Text>{this.props.bottomLabel}</Text>
      </View>
    
      <View style={{flex: 1}}>
        <TouchableNativeFeedback
          onPress={this.props.edit}
          background={TouchableNativeFeedback.Ripple('grey')}
          delayPressIn={0}
        >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <MaterialIcon name="mode-edit" size={30} style={{textAlign: 'center'}} />
          </View>
        </TouchableNativeFeedback>
      </View>
    
      <View style={{flex: 1}}>
        <TouchableNativeFeedback
          onPress={this.props.delete}
          background={TouchableNativeFeedback.Ripple('red')}
          delayPressIn={0}
        >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <MaterialIcon name="delete" size={30} color={red} style={{textAlign: 'center'}} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>;
  }
};

const styles = {
  row: {
    backgroundColor: 'white',
    borderRadius: 3,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
};