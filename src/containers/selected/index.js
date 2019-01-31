// @flow

import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SelectedResults from './SelectedResults';
import Footer from './Footer';

type Props = {
  navigation: Object
};

export default class Selected extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SelectedResults />
        <Footer navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  }
});
