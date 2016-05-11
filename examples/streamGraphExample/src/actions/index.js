export const EXAMPLE_REMOVED_NODE = 'EXAMPLE_REMOVED_NODE';
export const EXAMPLE_TOGGLED_NAME = 'EXAMPLE_TOGGLED_NAME';
export const EXAMPLE_UPDATE_PATHS = 'EXAMPLE_UPDATE_PATHS';
export const EXAMPLE_ALTER_OFFSET = 'EXAMPLE_ALTER_OFFSET';

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

export function alterOffset(name) {
  return {
    type: EXAMPLE_ALTER_OFFSET,
    name: name
  };
}
