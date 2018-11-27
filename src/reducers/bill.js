const initialState = {
  billInfo: []
}

export const actionTypes = {
  GET_BILLS_INFO: 'GET_BILLS_INFO',
  GET_BILLS_INFO_SUCCESS: 'GET_BILLS_INFO_SUCCESS'
}

export const actions = {
  getBillInfo(id) {
    return {
      type: actionTypes.GET_BILLS_INFO,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BILLS_INFO_SUCCESS:
      // console.log(action.payload)
      return {
        ...state,
        billInfo: action.payload
      }
    default:
      return state
  }
}

export default reducer
