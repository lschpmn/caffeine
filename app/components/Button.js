'use strict';

import React, {Component} from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {primaryColor} from '../lib/COLORS';

export default class Button extends Component{
  /**
   * @param {Function} props.onPress
   * @param {?String} props.rippleColor
   * @param {?String} props.buttonColor
   */
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
    return <TouchableNativeFeedback
      onPress={this.props.onPress}
      background={TouchableNativeFeedback.Ripple(this.props.rippleColor || 'red')}
      delayPressIn={0}
    >
      <View style={{...styles.button, backgroundColor: this.props.buttonColor || primaryColor }}>
        {this.props.children}
      </View>
    </TouchableNativeFeedback>
  }
}

const styles = {
  button: {
    borderRadius: 3,
    flex: 1,
    margin: 10,
    elevation: 5
  }
};