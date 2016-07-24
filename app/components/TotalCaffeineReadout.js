'use strict';

import React,{Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {calculateCaffeineLevel} from '../lib/functions';

class TotalCaffeineReadout extends Component {
  /**
   * @param {drink[]} props.drinks
   * @param {Number} props.currTime
   */
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
    const total = this.props.drinks.reduce((prev, drink) => {
      return prev + calculateCaffeineLevel(drink.mgPerOz * drink.amount, drink.created);
    }, 0);
    
    return <Text>{~~total} Mg</Text>;
  }
}

export default connect(({drinks, currTime}) => ({drinks, currTime}))(TotalCaffeineReadout);