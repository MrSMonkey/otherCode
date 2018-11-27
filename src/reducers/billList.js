const initialState = {
  bills: {}
}

export const actionTypes = {
  GET_MY_BILLS: 'GET_MY_BILLS',
  GET_MY_BILLS_SUCCESS: 'GET_MY_BILLS_SUCCESS',
  SAVE_MY_BILLS: 'SAVE_MY_BILLS'
}

export const actions = {
  getMyBills() {
    return {
      type: actionTypes.GET_MY_BILLS,
    }
  },
  saveMyBills(data) {
    return {
      type: actionTypes.SAVE_MY_BILLS,
      payload: data
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_BILLS_SUCCESS:
      return {
        ...state,
        bills: action.payload
      };
    case actionTypes.SAVE_MY_BILLS:
      const storedItems = state.bills.Items
      return {
        ...state,
        bills: {
          ...action.payload,
          Items: storedItems ? storedItems.concat(action.payload.Items) : action.payload.Items
        }
      }
    default:
      return state
  }
}

export default reducer
