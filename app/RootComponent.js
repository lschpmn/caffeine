'use strict';

import React, {Component} from 'react';
import {AsyncStorage, Navigator, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import MainView from './views/MainView';
import {primaryColor} from './lib/COLORS';
import {drinksReducer, drinkTypesReducer, timeReducer} from './lib/reducers';
import SettingsView from './views/SettingsView';

export default class RootComponent extends Component {
  constructor() {
    super();
    const reducer = combineReducers({
      drinks: drinksReducer,
      drinkTypes: drinkTypesReducer,
      currTime: timeReducer
    });
    
    this.state = {store: createStore(reducer)};
    
    setInterval(() => this.state.store.dispatch({type: 'UPDATE_TIME'}), 1000);
    
    this.routeChange = this.routeChange.bind(this);
  }
  
  componentDidMount() {
    const store = this.state.store;
    
    AsyncStorage.getItem('drinks')
      .then(drinks => {
        if(!drinks) return;
        
        store.dispatch({
          type: 'REPLACE_DRINKS',
          drinks: JSON.parse(drinks)
        });
      });
    
    store.subscribe(() => {
      const {drinks} = store.getState();
      
      AsyncStorage.setItem('drinks', JSON.stringify(drinks));
    });
  }
  
  routeChange(route, navigator) {
    let view;
    
    switch(route.title) {
      case 'settings':
        view = <SettingsView />;
        break;
      case 'root':
      default:
        view = <MainView />;
    }
    
    return <View style={styles.container}>{view}</View>;
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
        <Navigator
          initialRoute={{title: 'root', index: 0}}
          renderScene={this.routeChange}
      
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route,nav) => route.index !== 0 ? <Text onPress={() => nav.jumpBack()}>Back</Text> : null,
                
                Title: () => (<Text style={styles.navbarText}>Caffeine</Text>),
                
                RightButton: (route, nav) => route.index === 0 ? <Text style={styles.navbarText} onPress={() => nav.push({title: 'settings', index: 1})}>Settings</Text> : null
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
  container: {
    flex: 1,
    marginTop: 55
  },
  
  navbar: {
    backgroundColor: primaryColor
  },
  
  navbarText: {
    color: 'white'
  }
};