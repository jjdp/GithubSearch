// @flow

import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Footer from './Footer';

type Props = {
  navigation: Object
};

export default class Home extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <SearchResults />
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
