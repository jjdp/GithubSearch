// @flow

import type { Action } from '../actions';

type State = {
  isLoading: boolean,
  items: Array<Object>,
  error: any,
  end: boolean,
  page: number,
  prevQuery: string,
  selected: Array<{ item: Object, index: number }>
};

const initialState = {
  isLoading: false,
  items: [],
  error: '',
  end: false,
  page: 1,
  prevQuery: '',
  selected: []
};

export default function repositories(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'FETCH_REPOSITORIES': {
      return {
        ...state,
        isLoading: true,
        page: state.page + 1
      };
    }
    case 'FETCH_REPOSITORIES_SUCCESS': {
      if (!action.items || action.items.length === 0) {
        return {
          ...state,
          isLoading: false,
          end: true
        };
      }

      return {
        ...state,
        isLoading: false,
        items: [...state.items, ...action.items],
        prevQuery: action.prevQuery
      };
    }
    case 'FETCH_REPOSITORIES_FAIL': {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case 'FETCH_REPOSITORIES_RESET': {
      return initialState;
    }
    case 'SELECT_REPOSITORY': {
      let found = state.selected.find(item => {
        return item.index === action.index;
      });

      if (!found) {
        return {
          ...state,
          selected: [
            ...state.selected,
            { item: action.item, index: action.index }
          ]
        };
      } else {
        return {
          ...state,
          selected: state.selected.filter(item => item.index !== action.index)
        };
      }
    }
    case 'DELETE_REPOSITORIES': {
      const selectedIndex = state.selected.map(
        selectedItem => selectedItem.index
      );
      const newResults = state.items.filter(
        (item, index) => selectedIndex.indexOf(index) === -1
      );

      return {
        ...state,
        items: newResults,
        selected: []
      };
    }
    default:
      return state;
  }
}
