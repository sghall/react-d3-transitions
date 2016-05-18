export const APP_REMOVE_NODE = 'APP_REMOVE_NODE';
export const APP_TOGGLE_NAME = 'APP_TOGGLE_NAME';
export const APP_UPDATE_PATHS = 'APP_UPDATE_PATHS';
export const APP_CHANGE_OFFSET = 'APP_CHANGE_OFFSET';

export function removeNode(udid) {
  return {
    type: APP_REMOVE_NODE,
    udid: udid
  };
}

export function toggleName(index) {
  return {
    type: APP_TOGGLE_NAME,
    index: index
  };
}

export function updatePaths() {
  return {
    type: APP_UPDATE_PATHS
  };
}

export function changeOffset(name) {
  return {
    type: APP_CHANGE_OFFSET,
    name: name
  };
}
