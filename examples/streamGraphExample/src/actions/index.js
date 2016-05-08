export const EXAMPLE_REMOVED_NODE = 'EXAMPLE_REMOVED_NODE';
export const EXAMPLE_UPDATE_ORDER = 'EXAMPLE_UPDATE_ORDER';
export const EXAMPLE_UPDATE_COUNT = 'EXAMPLE_UPDATE_COUNT';

export function removedNode(udid) {
  return {
    type: EXAMPLE_REMOVED_NODE,
    udid: udid
  };
}

export function updateSortOrder(sortKey) {
  return {
    type: EXAMPLE_UPDATE_ORDER,
    sortKey: sortKey
  };
}

export function updateTopCount(topN) {
  return {
    type: EXAMPLE_UPDATE_COUNT,
    topN: topN
  };
}
