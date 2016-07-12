'use strict';

import React, {Component} from 'react';
import {Navigator, Text} from 'react-native';
import MainView from './views/MainView';

export default class RootComponent extends Component {
  constructor() {
    super();
    this.routeChange = this.routeChange.bind(this);
  }
  
  routeChange(route, navigator) {
    
    
    return <MainView />;
  }
  
  render() {
    return (
      <Navigator 
        initialRoute={{title: 'root'}}
        renderScene={this.routeChange}
        
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: () => (null),
              Title: () => (<Text style={styles.navbarText}>Caffeine</Text>),
              RightButton: () => (<Text style={styles.navbarText}>Settings</Text>)
            }}
            
            style={styles.navbar}
          />
        }
      />
    );
  }
}

const styles = {
  navbar: {
    backgroundColor: '#3498db'
  },
  
  navbarText: {
    color: 'white'
  }
};