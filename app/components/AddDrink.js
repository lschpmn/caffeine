'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Text, TouchableNativeFeedback, View} from 'react-native';

class AddDrink extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    
    setInterval(() => {
      this.setState({showModal: false});
    }, 5000);
    
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  
  render() {
    return <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('red', true)}
      onPress={this.toggleModal}
    >
      <View style={styles.button}>
        <Text>Add Drink</Text>
        
        <Modal
          onRequestClose={() => {console.log('no close! only open')}}
          visible={this.state.showModal}
          transparent={true}
        >
  
          <View style={styles.modalBackground}>
            <View style={styles.modal}>
              
              {/*modal close button*/}
              <View style={styles.close}>
                <Text style={styles.closeButton} onPress={this.toggleModal}>Close</Text>
              </View>
              
              <Text>I'm a modal!</Text>
            </View>
          </View>
          
        </Modal>
      </View>
    </TouchableNativeFeedback>;
  }
}

const styles = {
  button: {
    backgroundColor: '#3498db',
    flex: 1
  },
  
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
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10
  }
};

export default connect()(AddDrink);