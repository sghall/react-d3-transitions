import {
  EXAMPLE_DATA_UPDATE,
  EXAMPLE_REMOVE_ITEM
} from '../actions/exampleActions';

let colors = {
  mounting: '#CDDC39',
  updating: '#FAFAFA',
  removing: '#F44336'
};

function processUpdate(state, data) {
  let result = {};

  let cursor = 0;

  for (let i = 0; i < data.length; i++) {
    let letter = data[i];

    cursor += 1;

    if (state.mounted[letter] && state.removed[letter]) {
      cursor -= 1;
    } else if (state.mounted[letter] && !state.removed[letter]) {
      result[letter] = {
        name: letter,
        fill: colors['updating'],
        type: 'updating',
        xVal: cursor * 32
      };
    } else {
      result[letter] = {
        name: letter,
        fill: colors['mounting'],
        type: 'mounting',
        xVal: cursor * 32
      };
    }
  }

  for (let letter in state.mounted) {
    if (!result[letter] && !state.removed[letter]) {
      result[letter] = {
        name: letter,
        fill: colors['removing'],
        type: 'removing',
        xVal: state.mounted[letter].xVal
      };
    }
  }

  return result;
}

function removeItem(state, item) {
  let removed = {};
  removed[item] = true;

  return Object.assign({}, state.removed, removed);
}

let initialState = {
  mounted: {},
  removed: {}
};

export function exampleReducer(state = initialState, action) {
  switch (action.type) {

  case EXAMPLE_DATA_UPDATE:
    return Object.assign({}, state, {
      mounted: processUpdate(state, action.data),
      removed: {}
    });

  case EXAMPLE_REMOVE_ITEM:
    return Object.assign({}, state, {
      removed: removeItem(state, action.item)
    });

  default:
    return state;
  }
}
