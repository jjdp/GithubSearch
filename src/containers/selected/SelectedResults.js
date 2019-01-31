// @flow

import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import SelectedResultsItem from './SelectedResultsItem';

type Props = {
  selected: Array<{ item: Object, index: number }>
};

class SelectedResults extends Component<Props> {
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.selected}
        renderItem={({ item, index }) => (
          <SelectedResultsItem item={item} index={index} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 10
  }
});

const mapStateToProps = state => ({
  selected: state.repositories.selected
});

export default connect(mapStateToProps)(SelectedResults);
