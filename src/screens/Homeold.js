import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import styles from '../assets/styles/homeStyle';

class Home extends React.Component {
  state = {
    isShow: false,
    modalVisible: false,
    window: Dimensions.get('window'),
  };
  onChange = ({window}) => {
    this.setState({
      window,
    });
  };
  componentDidMount() {
    console.log('did mount', this.state.window);
    Dimensions.addEventListener('change', this.onChange);
  }
  componentDidUpdate(_, prevState) {
    console.log('did update ', prevState.isShow, ' to ', this.state.isShow);
    const orientation =
      this.state.window.height > this.state.window.width
        ? 'portrait'
        : 'landscape';
    console.log(orientation);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Happy New Year</Text>
        </View>
        <View style={styles.content}>
          {this.state.isShow && (
            <Text style={styles.textContent}>
              Semoga 2021 menjadi tahun yang lebih baik
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.setState({
              isShow: !this.state.isShow,
            })
          }>
          <Text style={styles.textButton}>Show/Hide Message</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                  });
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setState({
              modalVisible: true,
            });
          }}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </>
      // <div>
      //   <p>Happy New Year</p>
      // </div>
    );
  }
}

export default Home;