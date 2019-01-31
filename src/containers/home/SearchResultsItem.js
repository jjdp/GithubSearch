// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';

import { selectRepository } from '../../redux/actions';
import { DEFAULT_PER_PAGE } from '../../api';

type Props = {
  selectRepository: typeof selectRepository,
  selected: Array<{ item: Object, index: number }>,
  item: Object,
  index: number
};

type State = {
  value: AnimatedValue
};

class SearchResultsItem extends Component<Props, State> {
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

  _onPressItem = () => {
    const { item, index } = this.props;
    this.props.selectRepository(item, index);
  };

  render() {
    const { item, index } = this.props;

    const avatar = item.owner.avatar_url || '';
    const name = item.full_name || '';
    const stars = item.stargazers_count || 0;

    const selected = this.props.selected.find(item => {
      return item.index === index;
    });
    const viewStyle = [
      styles.item,
      { opacity: this.state.value },
      selected ? styles.itemSelected : null
    ];

    return (
      <TouchableOpacity onPress={this._onPressItem}>
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
  itemSelected: {
    backgroundColor: 'orange'
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

const mapDispatchToProps = dispatch => ({
  selectRepository: (item, index) => dispatch(selectRepository(item, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsItem);
