'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import AddDrink from '../components/AddDrink';
import DrinkList from '../components/DrinkList';
import TotalCaffeineReadout from '../components/TotalCaffeineReadout';

export default class MainView extends Component {
  render() {
    return <View style={styles.container}>
      <View style={styles.top}>
        <TotalCaffeineReadout />
      </View>
      
      <View style={styles.middle}>
        <DrinkList />
      </View>
      
      <View style={styles.bottom}>
        <AddDrink />
      </View>
      
    </View>;
  }
}

const styles = {
  container: {
    flex: 1
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