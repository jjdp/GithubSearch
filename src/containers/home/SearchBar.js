// @flow

import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchRepositories } from '../../redux/actions';

type Props = {
  fetchRepositories: typeof fetchRepositories,
  isLoading: boolean,
  error?: any
};

type State = {
  text: string
};

class SearchBarComponent extends Component<Props, State> {
  state = {
    text: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.text !== prevState.text && this.state.text) {
      this.props.fetchRepositories({ query: this.state.text, isNew: true });
    }
  }

  _onChangeText = text => {
    if (text !== text.toLowerCase()) {
      Alert.alert('Capital letters not allowed');

      this.setState(prevState => ({
        text: prevState.text
      }));
      return;
    }

    this.setState({ text });
  };

  render() {
    const { text } = this.state;

    return (
      <SearchBar
        containerStyle={styles.container}
        placeholder="Seach repositories..."
        onChangeText={this._onChangeText}
        value={text}
        lightTheme
        autoCapitalize="none"
        showLoading={this.props.isLoading}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5
  }
});

const mapStateToProps = state => ({
  isLoading: state.repositories.isLoading,
  error: state.repositories.error
});

const mapDispatchToProps = dispatch => ({
  fetchRepositories: params => dispatch(fetchRepositories(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarComponent);
