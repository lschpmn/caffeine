'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DrinkModal from './DrinkModal';
import {calculateCaffeineLevel} from '../lib/functions';
import Row from './Row';

class DrinkList extends Component {
  /**
   * @param {drink[]} _props.drinks
   * @param {Number} _props.currTime
   * @param {Redux.Dispatch} _props.dispatch
   */
  constructor(_props) {
    super(_props);
    this.props = _props;
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showModal: false,
      modalSettings: {},
      selectedIndex: -1
    };
  
    this.editDrink = this.editDrink.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  /**
   * @param {Number} created
   */
  createdTimeToHumanReadable(created) {
    const age = ~~((this.props.currTime - created) / 1000);
    
    if(age < 60) {
      return `${age} second${age < 2 ? '' : 's'}`;
    } else if(age < 3600) {
      const mins = ~~(age / 60);
      
      return `${mins} minute${mins == 1 ? '' : 's'}`;
    } else {
      const hours = ~~(age / 3600);
      
      return `${hours} hour${hours == 1 ? '' : 's'}`;
    }
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
  
  renderRow(drink, sectionID, rowID) {
    const caffeineLevel = calculateCaffeineLevel(drink.mgPerOz * drink.amount, drink.created);
    const age = this.createdTimeToHumanReadable(drink.created);
    
    return <Row 
      topLabel={`${~~caffeineLevel} mg from ${drink.amount} oz of ${drink.name}`}
      bottomLabel={`Taken ${age} ago`}
      edit={() => this.toggleModal(+rowID)}
      delete={() => this.deleteDrink(+rowID)}
    />;
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
  
  componentWillReceiveProps({currTime}) {
    //clears drinks once the caffeine they contribute gets too low
    this.props.drinks.forEach((drink, i) => {
      if(currTime - drink.created < 3600000) return;
      
      const amount = calculateCaffeineLevel(drink.amount * drink.mgPerOz, drink.created);
      
      if(amount < 1) this.deleteDrink(i);
    });
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinks);
    
    return <View style={styles.container}>
      {this.props.drinks.length !== 0 ? <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
      /> : <Text style={styles.emptyText}>No Drinks</Text>}
      
      {this.state.showModal ? <DrinkModal toggleModal={this.toggleModal} submitDrink={this.editDrink} {...this.state.modalSettings} /> : null}
    </View>;
  }
}

const styles = {
  container: {
    flex: 1
  },
  
  emptyText: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
};

export default connect(({drinks, currTime}) => ({drinks, currTime}))(DrinkList);