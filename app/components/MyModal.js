'use strict';

import React, {Component} from 'react';
import {Modal, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {red, white} from '../lib/COLORS';

export default class MyModal extends Component {
  /**
   * @param {Boolean} props.isVisible
   * @param {Function} props.toggleModal
   */
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
    return <Modal
      onRequestClose={() => {}}
      visible={this.props.isVisible}
      transparent={true}
      animationType={'slide'}
    >
      
      <View style={styles.modalBackground}>
        <View  style={styles.modal}>
  
          {/*modal close button*/}
          <View style={styles.close}>
            <MaterialIcon 
              name="clear" 
              size={30} 
              color={red} 
              style={{textAlign: 'center'}} 
              onPress={this.props.toggleModal} 
            />
          </View>
          
          {this.props.children}
        </View>
      </View>
      
    </Modal>
  }
}

const styles = {
  close: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  
  closeButton: {
    color: 'red'
  },
  
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  
  modal: {
    backgroundColor: white,
    padding: 20,
    margin: 10,
    borderRadius: 10
  }
};