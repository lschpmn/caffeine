'use strict';

import React,{Component} from 'react';
import {Text, View} from 'react-native';
import {getTheme} from 'react-native-material-kit';
import {connect} from 'react-redux';
import {calculateCaffeineLevel} from '../lib/functions';

const theme = getTheme();

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
    
    return <View style={style.container}>
      <View style={{...theme.cardStyle, elevation: 5}}>
        <Text style={{...style.text, ...theme.cardContentStyle}}>{~~total} Mg</Text>
      </View>
      </View>;
  }
}

export default connect(({drinks, currTime}) => ({drinks, currTime}))(TotalCaffeineReadout);

const style = {
  container: {
    flex: 1,
    padding: 10
  },
  
  text: {
    flex: 1,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    fontSize: 50,
    fontWeight: 'bold',
    marginRight: 10
  }
};