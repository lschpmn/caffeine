'use strict';

import React, {Component} from 'react';
import {Navigator, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import MainView from './views/MainView';
import {primaryColor} from './lib/COLORS';
import {drinksReducer, drinkTypesReducer} from './lib/reducers';

export default class RootComponent extends Component {
  constructor() {
    super();
    const reducer = combineReducers({
      drinks: drinksReducer,
      drinkTypes: drinkTypesReducer
    });
    
    this.state = {store: createStore(reducer)};
    
    this.routeChange = this.routeChange.bind(this);
  }
  
  routeChange(route, navigator) {
    
    
    return <MainView />;
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
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
      </Provider>
    );
  }
}

const styles = {
  navbar: {
    backgroundColor: primaryColor
  },
  
  navbarText: {
    color: 'white'
  }
};