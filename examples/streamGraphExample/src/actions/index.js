export const EXAMPLE_REMOVED_NODE = 'EXAMPLE_REMOVED_NODE';
export const EXAMPLE_TOGGLED_NAME = 'EXAMPLE_TOGGLED_NAME';
export const EXAMPLE_UPDATE_PATHS = 'EXAMPLE_UPDATE_PATHS';

export function removedNode(udid) {
  return {
    type: EXAMPLE_REMOVED_NODE,
    udid: udid
  };
}

export function toggledName(index) {
  return {
    type: EXAMPLE_TOGGLED_NAME,
    index: index
  };
}

export function updatePaths() {
  return {
    type: EXAMPLE_UPDATE_PATHS
  };
}
