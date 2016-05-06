export const EXAMPLE_REQUEST_DATA = 'EXAMPLE_REQUEST_DATA';
export const EXAMPLE_RECEIVE_DATA = 'EXAMPLE_RECEIVE_DATA';
export const EXAMPLE_REQUEST_FAIL = 'EXAMPLE_REQUEST_FAIL';
export const EXAMPLE_REMOVED_NODE = 'EXAMPLE_REMOVED_NODE';
export const EXAMPLE_UPDATE_ORDER = 'EXAMPLE_UPDATE_ORDER';
export const EXAMPLE_UPDATE_COUNT = 'EXAMPLE_UPDATE_COUNT';

function requestData() {
  return {
    type: EXAMPLE_REQUEST_DATA,
    time: Date.now()
  };
}

function receiveData(text) {
  return {
    type: EXAMPLE_RECEIVE_DATA,
    data: JSON.parse(text)
  };
}

function receiveFail(errMessage) {
  return {
    type: EXAMPLE_REQUEST_FAIL,
    errMessage: errMessage
  };
}

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

export function fetchData() {
  return dispatch => {
    dispatch(requestData());

    let request = new XMLHttpRequest();
    request.open('GET', '/src/data/states_by_age.json', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        dispatch(receiveData(request.responseText));
      } else {
        dispatch(receiveFail(`Server Error: ${request.status}`));
      }
    };

    request.onerror = e => {
      dispatch(receiveFail(`Connection Error: ${e}`));
    };

    request.send();
  };
}
