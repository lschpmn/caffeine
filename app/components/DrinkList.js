'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DrinkModal from './DrinkModal';

class DrinkList extends Component {
  /**
   * @param {drink[]} props.drinks
   * @param {Redux.Dispatch} props.dispatch
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showModal: false,
      modalSettings: {},
      selectedIndex: -1
    };
  
    this.editDrink = this.editDrink.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  deleteDrink(index) {
    this.props.dispatch({
      type: 'DELETE_DRINK',
      index
    });
  }
  
  editDrink(drink) {
    if(this.state.selectedIndex < 0) return;
    
    this.props.dispatch({
      type: 'EDIT_DRINK',
      drink,
      index: this.state.selectedIndex
    });
  }
  
  toggleModal(index) {
    const drink = this.props.drinks[index];
    
    if(drink) {
      this.setState({
        showModal: true,
        selectedIndex: index,
        modalSettings: {
          drinkTypeName: drink.name,
          drinkAmount: drink.amount,
          drinkTime: drink.created
        }
      });
    } else {
      this.setState({
        showModal: false
      });
    }
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinks);
    
    return <View style={styles.container}>
      <ListView
        dataSource={dataSource}
        renderRow={(drink, sectionID, rowID) => <View style={styles.row}>
          <Text style={{flex: 1}}>{drink.name}</Text>
          <Text style={{flex: 1}} onPress={() => this.toggleModal(rowID)}>Edit</Text>
          <Text style={{flex: 1}} onPress={() => this.deleteDrink(rowID)}>Delete</Text>
        </View>}
      />
      
      {this.state.showModal ? <DrinkModal toggleModal={this.toggleModal} submitDrink={this.editDrink} {...this.state.modalSettings} /> : null}
    </View>;
  }
}

const styles = {
  container: {
    marginHorizontal: 5
  },
  
  row: {
    flex: 1,
    flexDirection: 'row'
  }
};

export default connect(({drinks}) => ({drinks}))(DrinkList);