// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchRepositories } from '../../redux/actions';
import SearchResultsItem from './SearchResultsItem';

type Props = {
  isLoading: boolean,
  end: boolean,
  fetchRepositories: typeof fetchRepositories,
  items: Array<Object>,
  selected: Array<{ item: Object, index: number }>,
  error?: any
};

class SearchResults extends Component<Props> {
  _onEndReached = () => {
    if (!this.props.isLoading && !this.props.end) {
      this.props.fetchRepositories();
    }
  };

  _renderListFooter = () => {
    if (this.props.end) {
      return <Text style={styles.footer}>End</Text>;
    }

    return null;
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.items}
        renderItem={({ item, index }) => (
          <SearchResultsItem item={item} index={index} />
        )}
        ListFooterComponent={this._renderListFooter}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.1}
        extraData={{
          end: this.props.end,
          selected: this.props.selected
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 10
  },
  footer: {
    textAlign: 'center',
    marginTop: 10
  }
});

const mapStateToProps = state => ({
  isLoading: state.repositories.isLoading,
  end: state.repositories.end,
  items: state.repositories.items,
  error: state.repositories.error,
  selected: state.repositories.selected
});

const mapDispatchToProps = dispatch => ({
  fetchRepositories: params => dispatch(fetchRepositories(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
