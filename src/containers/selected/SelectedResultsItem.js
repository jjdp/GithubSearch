// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';

import { DEFAULT_PER_PAGE } from '../../api';

type Props = {
  selected: Array<{ item: Object, index: number }>,
  item: { item: Object, index: number },
  index: number
};

type State = {
  value: AnimatedValue
};

class SelectedResultsItem extends Component<Props, State> {
  state = {
    value: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 400,
      delay: (this.props.index % DEFAULT_PER_PAGE) * 200
    }).start();
  }

  _onPress = () => {
    const { item } = this.props;
    const repo = item.item;

    const url = repo.html_url || '';

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Url not supported');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(error => Alert.alert('Please try again'));
  };

  render() {
    const { item } = this.props;

    const repo = item.item;
    const avatar = repo.owner.avatar_url || '';
    const name = repo.full_name || '';
    const stars = repo.stargazers_count || 0;

    const viewStyle = [styles.item, { opacity: this.state.value }];

    return (
      <TouchableOpacity onPress={this._onPress}>
        <Animated.View style={viewStyle}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.row2}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.starsContainer}>
              <Icon name="star" />
              <Text style={styles.stars}>{stars}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 10
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10
  },
  row2: {
    flex: 1,
    flexWrap: 'wrap'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stars: {
    marginLeft: 5,
    fontWeight: '100'
  }
});

const mapStateToProps = state => ({
  selected: state.repositories.selected
});

export default connect(mapStateToProps)(SelectedResultsItem);
