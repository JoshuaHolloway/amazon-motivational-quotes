import { useReducer, useCallback } from 'react';

// ==============================================

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
}

// ==============================================

function useHttp(requestFunction, startWithPending = false) {
  // -requestFunction is a function that gets called by this
  //  hook that will send the actual request.
  //    --This function is one of the ones defined in lib/api.js
  // -startWithPending specifies if the hook should start
  //  in loading state or not
  //    --(usually used if you use this in a component
  //       that sends a request upon initial render)
  // -Returned:
  //  --Object that contains:
  //    ---Function which we can call to actually start sending the request.
  //    ---Some HTTP state that is an object with:
  //        ----the current status of the request (on-way / succeeded / failed),
  //        ----response data
  //        ----possible error data

  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

// ==============================================

export default useHttp;
