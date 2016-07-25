'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class SettingsView extends Component {
  render() {
    return <View style={{flex: 1}}>
      <Text style={{color: 'black'}}>See me?</Text>
    </View>;
  }
}