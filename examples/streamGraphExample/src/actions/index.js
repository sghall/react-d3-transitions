export const APP_REMOVED_NODE = 'APP_REMOVED_NODE';
export const APP_TOGGLED_NAME = 'APP_TOGGLED_NAME';
export const APP_UPDATE_PATHS = 'APP_UPDATE_PATHS';
export const APP_CHANGE_OFFSET = 'APP_CHANGE_OFFSET';

export function removedNode(udid) {
  return {
    type: APP_REMOVED_NODE,
    udid: udid
  };
}

export function toggledName(index) {
  return {
    type: APP_TOGGLED_NAME,
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
