'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DrinkTypeModal from '../components/DrinkTypeModal';

class SettingsView extends Component {
  /**
   * @param {drink[]} props.drinkTypes
   * @param {Redux.Dispatch} props.dispatch
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isVisible: false,
      index: -1
    };
    
    this.renderRow = this.renderRow.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  deleteDrinkType(index) {
    this.props.dispatch({
      type: 'DELETE_DRINK_TYPE',
      index
    });
  }
  
  /**
   * @param {drinkType} drinkType
   */
  submit(drinkType) {
    this.props.dispatch({
      type: 'EDIT_DRINK_TYPE',
      drinkType,
      index: this.state.index
    });
  }
  
  /**
   * @param {drinkType} drinkType
   * @param {Number} sectionID
   * @param {Number} rowID
   */
  renderRow(drinkType, sectionID, rowID) {
    return <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 3}}>
        <Text>{drinkType.name}, {drinkType.mgPerOz} mg per oz</Text>
      </View>
      
      <View style={{flex: 1}}>
        <Text onPress={() => this.setState({isVisible: true, index: rowID})}>Edit</Text>
      </View>
  
      <View style={{flex: 1}}>
        <Text onPress={() => this.deleteDrinkType(rowID)}>Delete</Text>
      </View>
    </View>
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinkTypes);
    const configuredModal = <DrinkTypeModal
      isVisible={this.state.isVisible}
      closeModal={() => this.setState({isVisible: false})}
      index={this.state.index}
      submit={this.submit}
    />;
    
    return <View style={{flex:1}}>
      <View style={styles.head}>
        <Text style={styles.title}>Drink Types</Text>
      </View>
      
      {this.state.isVisible ? configuredModal : null}
      
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