export const EXAMPLE_REQUEST_DATA = 'EXAMPLE_REQUEST_DATA';
export const EXAMPLE_RECEIVE_DATA = 'EXAMPLE_RECEIVE_DATA';
export const EXAMPLE_REQUEST_FAIL = 'EXAMPLE_REQUEST_FAIL';
export const EXAMPLE_REMOVED_ITEM = 'EXAMPLE_REMOVED_ITEM';

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

export function removeItem(item) {
  return {
    type: EXAMPLE_REMOVED_ITEM,
    item: item
  };
}

export function fetchData() {
  return dispatch => {
    dispatch(requestData());

    let request = new XMLHttpRequest();
    request.open('GET', '/data/states_by_age.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        dispatch(receiveData(request.responseText));
      } else {
        dispatch(receiveFail(`Server Error: ${request.status}`));
      }
    };

    request.onerror = function() {
      dispatch(receiveFail('Connection Error'));
    };

    request.send();
  };
}
