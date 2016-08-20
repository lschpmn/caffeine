'use strict';

import React, {Component} from 'react';
import {AsyncStorage, Navigator, Text, TouchableNativeFeedback, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainView from './views/MainView';
import {primaryColor, white} from './lib/COLORS';
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
    
    AsyncStorage.getItem('drinkTypes')
      .then(drinkTypes => {
        if(!drinkTypes) return;
  
        store.dispatch({
          type: 'REPLACE_DRINK_TYPES',
          drinkTypes: JSON.parse(drinkTypes)
        });
      });
    
    store.subscribe(() => {
      const {drinks, drinkTypes} = store.getState();
      
      AsyncStorage.setItem('drinks', JSON.stringify(drinks));
      AsyncStorage.setItem('drinkTypes', JSON.stringify(drinkTypes));
    });
  }
  
  routeChange(route, navigator) {
    let view;
    
    switch(route.title) {
      case 'settings':
        view = <SettingsView navigator={navigator} />;
        break;
      case 'root':
      default:
        view = <MainView />;
    }
    
    return <View style={styles.container}>{view}</View>;
  }
  
  render() {
    const backButton = (route, nav) => {
      if(route.index === 0) return null;
      
      return <TouchableNativeFeedback
        onPress={() => nav.pop()}
        background={TouchableNativeFeedback.Ripple('white')}
        delayPressIn={0}
      >
        <View style={{flex: 1}}>
          <Icon
            name='keyboard-arrow-left'
            color={white} 
            size={30}
            style={styles.settingsIcon}
          />
        </View>
      </TouchableNativeFeedback>
    };
    
    const settingsButton = (route, nav) => {
      if(route.index !== 0) return null;
      
      return <TouchableNativeFeedback
        onPress={() => nav.push({title: 'settings', index: 1})}
        background={TouchableNativeFeedback.Ripple('white')}
        delayPressIn={0}
      >
        <View style={{flex: 1}}>
          <Icon
            name='settings'
            color={white} 
            size={30}
            style={styles.settingsIcon}
          />
        </View>
      </TouchableNativeFeedback>
    };
    
    return (
      <Provider store={this.state.store}>
        <Navigator
          initialRoute={{title: 'root', index: 0}}
          renderScene={this.routeChange}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
      
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: backButton,
                Title: () => (<Text style={styles.navbarText}>Caffeine</Text>),
                RightButton: settingsButton
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlignVertical: 'center',
    flex: 1
  },
  
  settingsIcon: {
    textAlignVertical: 'center',
    flex: 1
  }
};