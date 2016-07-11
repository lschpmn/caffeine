'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class MainView extends Component {
  render() {
    return <View style={styles.container}>
      <View style={styles.top}>
        <Text>top</Text>
      </View>
      
      <View style={styles.middle}>
        <Text>middle</Text>
      </View>
      
      <View style={styles.bottom}>
        <Text>bottom</Text>
      </View>
      
    </View>;
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 55
  },
  
  top: {
    flex: 1
  },
  
  middle: {
    flex: 3
  },
  
  bottom: {
    flex: 1
  }
};