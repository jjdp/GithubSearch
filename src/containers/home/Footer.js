// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { deleteRepositories } from '../../redux/actions';

type Props = {
  navigation: Object,
  deleteRepositories: typeof deleteRepositories,
  selected: Array<{ item: Object, index: number }>
};

class Footer extends Component<Props> {
  _getTotalStars = () => {
    let total = 0;
    this.props.selected.map(({ item }) => {
      total = total + item.stargazers_count;
    });

    return total;
  };

  _delete = () => {
    this.props.deleteRepositories();
  };

  _renderButtons = () => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const isHidden = this.props.selected.length === 0;

    return isHidden ? null : (
      <View style={styles.buttonsContainer}>
        <Button
          title="Delete"
          raised
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={this._delete}
        />

        <Button
          title="View"
          raised
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={() => this.props.navigation.navigate('Selected')}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selected</Text>
          <View style={styles.starsContainer}>
            <Icon name="stars" />
            <Text style={styles.stars}>{this._getTotalStars()}</Text>
          </View>
        </View>
        {this._renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    padding: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '900'
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0
  },
  stars: {
    marginLeft: 5,
    fontWeight: '100'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
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

const mapStateToProps = state => ({
  selected: state.repositories.selected
});

const mapDispatchToProps = dispatch => ({
  deleteRepositories: () => dispatch(deleteRepositories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
