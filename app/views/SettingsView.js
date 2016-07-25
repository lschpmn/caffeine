'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';

class SettingsView extends Component {
  /**
   * @param {drink[]} props.drinkTypes
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
    
    this.renderRow = this.renderRow.bind(this);
  }
  
  /**
   * @param {drinkType} drinkType
   */
  renderRow(drinkType) {
    return <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 3}}>
        <Text>{drinkType.name}, {drinkType.mgPerOz} mg per oz</Text>
      </View>
      
      <View style={{flex: 1}}>
        <Text>Edit</Text>
      </View>
  
      <View style={{flex: 1}}>
        <Text>Delete</Text>
      </View>
    </View>
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinkTypes);
    
    return <View style={{flex:1}}>
      <View style={styles.head}>
        <Text style={styles.title}>Drink Types</Text>
      </View>
      
      <View style={{flex:1}}>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
      </View>
    </View>;
  }
}

const styles = {
  head: {
    height: 35
  },
  
  title: {}
};

export default connect(({drinkTypes}) => ({drinkTypes}))(SettingsView);