'use strict';

import React, {Component} from 'react';
import {ListView, Text} from 'react-native';
import {connect} from 'react-redux';

class DrinkList extends Component {
  constructor() {
    super();
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }
  
  render() {
    const dataSource = this.state.ds.cloneWithRows(this.props.drinks);
    
    return <ListView 
      dataSource={dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />;
  }
}

export default connect(({drinks}) => ({drinks}))(DrinkList);