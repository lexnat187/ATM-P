import 'whatwg-fetch'
import {
  GET_FILTER_REQUEST,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE
} from './types'

const baseURL = 'http://localhost:3003/'
const brand = 'mandpfacets'

function getFilterRequest () {
  return {
    type: GET_FILTER_REQUEST,
    isFetching: true
  }
}

function getFilterSuccess (result) {
  return {
    type: GET_FILTER_SUCCESS,
    isFetching: false,
    filterResult: result
  }
}

function getFilterFailure (message) {
  return {
    type: GET_FILTER_FAILURE,
    isFetching: false,
    error: message
  }
}

export function getFilters ()  {
  return (dispatch, getState) => {
    dispatch(getFilterRequest())
    
    return fetch( `${baseURL}search/${brand}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
      .then(
        response => response.json(),
        error => dispatch(getFilterFailure(error)) 
      )
      .then(json =>
            dispatch(getFilterSuccess(json))
      )
  }
}
