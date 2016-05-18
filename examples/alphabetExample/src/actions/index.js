export const EXAMPLE_DATA_UPDATE = 'EXAMPLE_DATA_UPDATE';
export const EXAMPLE_REMOVE_ITEM = 'EXAMPLE_REMOVE_ITEM';

export function dataUpdate(data) {
  return {
    type: EXAMPLE_DATA_UPDATE,
    data: data
  };
}

export function removeItem(item) {
  return {
    type: EXAMPLE_REMOVE_ITEM,
    item: item
  };
}
