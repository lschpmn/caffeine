'use strict';

import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';

class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinks);
    
    return <View style={styles.container}>
      <ListView
        dataSource={dataSource}
        renderRow={(drink) => <View style={styles.row}>
          <Text style={{flex: 1}}>{drink.name}</Text>
          <Text style={{flex: 1}}>Edit</Text>
          <Text style={{flex: 1}}>Delete</Text>
        </View>}
      />
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