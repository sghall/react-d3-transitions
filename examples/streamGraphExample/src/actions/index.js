export const EXAMPLE_REMOVED_NODE = 'EXAMPLE_REMOVED_NODE';
export const EXAMPLE_TOGGLED_NAME = 'EXAMPLE_TOGGLED_NAME';

export function removedNode(udid) {
  return {
    type: EXAMPLE_REMOVED_NODE,
    udid: udid
  };
}

export function toggleName(name) {
  return {
    type: EXAMPLE_TOGGLED_NAME,
    name: name
  };
}

