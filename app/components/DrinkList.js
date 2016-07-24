'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DrinkModal from './DrinkModal';
import {calculateCaffeineLevel} from '../lib/functions';

class DrinkList extends Component {
  /**
   * @param {drink[]} props.drinks
   * @param {Number} props.currTime
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
    
    return <View style={styles.row}>
      <View style={styles.rowTop}>
        <Text style={{flex:1,textAlign:'center'}} onPress={() => this.toggleModal(rowID)}>Edit</Text>
        <Text style={{flex:1,textAlign:'center'}} onPress={() => this.deleteDrink(rowID)}>Delete</Text>
      </View>
  
      <View style={styles.rowBottom}>
        <Text style={{flex:1,textAlign:'center'}}>{~~caffeineLevel} mg from {drink.amount} oz of {drink.name}, taken {age} ago</Text>
      </View>
    </View>;
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
        renderRow={this.renderRow}
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
    flex: 1
  },
  
  rowTop: {
    flex: 1,
    flexDirection: 'row'
  },
  
  rowBottom: {
    flex: 1,
    flexDirection: 'row'
  }
};

export default connect(({drinks, currTime}) => ({drinks, currTime}))(DrinkList);