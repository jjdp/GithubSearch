// @flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  navigation: Object
};

export default class Footer extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Back"
          raised
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    padding: 10
  },
  buttonContainer: {
    width: 100
  },
  button: {
    backgroundColor: 'darkorange'
  },
  buttonTitle: {
    fontSize: 14
  }
});
