const initialState = {
  data: {},
  loading: false
}

export const actionTypes = {
  GET_ORDER_DETILE: 'GET_ORDER_DETILE',
  LOADING_SUCCESS: 'LOADING_SUCCESS',
  GET_ORDER_DETILE_SUCCESS: 'GET_ORDER_DETILE_SUCCESS'
}

export const actions = {
  getServiceOrderList(id) {
    return {
      type: actionTypes.GET_ORDER_DETILE,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_DETILE:
      return {
        loading: true
      }
    case actionTypes.GET_ORDER_DETILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case actionTypes.LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default reducer
