'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import AddDrinkType from '../components/AddDrinkType';
import DrinkTypeModal from '../components/DrinkTypeModal';
import Row from '../components/Row';

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
    return <Row 
      topLabel={drinkType.name}
      bottomLabel={drinkType.mgPerOz + ' mg per oz'}
      edit={() => this.setState({isVisible: true, index: rowID})}
      delete={() => this.deleteDrinkType(rowID)}
    />;
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinkTypes);
    const configuredModal = <DrinkTypeModal
      closeModal={() => this.setState({isVisible: false})}
      index={this.state.index}
      submit={this.submit}
    />;
    
    return <View style={{flex:1}}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Drink Types</Text>
      </View>
      
      {this.state.isVisible ? configuredModal : null}
      
      <View style={{flex:6}}>
        {this.props.drinkTypes.length !== 0 ? 
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
          /> : 
          <Text style={styles.emptyText}>No Drink Types</Text>}
      </View>
      
      <View style={{flex:1}}>
        <AddDrinkType />
      </View>
    </View>;
  }
}

const styles = {
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  
  emptyText: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
};

export default connect(({drinkTypes}) => ({drinkTypes}))(SettingsView);