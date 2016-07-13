'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableNativeFeedback} from 'react-native';

class AddDrink extends Component {
  constructor() {
    super();
    
    this.clicked = this.clicked.bind(this);
  }
  
  clicked() {
    console.log('Clicked');
  }
  
  render() {
    return <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('red', true)}
      onPress={this.clicked}
    > 
      <View style={styles.button}>
        <Text>Add Drink</Text>
      </View>
    </TouchableNativeFeedback>;
  }
}

const styles = {
  button: {
    backgroundColor: '#3498db',
    flex: 1
  }
};

export default connect()(AddDrink);