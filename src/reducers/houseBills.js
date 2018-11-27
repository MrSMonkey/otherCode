const initialState = {
  houseBills: {}
}

export const actionTypes = {
  GET_HOUSE_BILLS: 'GET_HOUSE_BILLS',
  GET_HOUSE_BILLS_SUCCESS: 'GET_HOUSE_BILLS_SUCCESS',
  INIT_HOUSE_BILLS: 'INIT_HOUSE_BILLS'
}

export const actions = {
  getHouseBills(houseId, page) {
    return {
      type: actionTypes.GET_HOUSE_BILLS,
      houseId,
      page
    }
  },
  saveHouseBills(data) {
    return {
      type: actionTypes.GET_HOUSE_BILLS_SUCCESS,
      payload: data
    }
  },
  initHouseListData() {
    return {
      type: actionTypes.INIT_HOUSE_BILLS,
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOUSE_BILLS_SUCCESS:
      const storedItems = state.houseBills.Items
      return {
        ...state,
        houseBills: {
          ...action.payload,
          Items: storedItems ? storedItems.concat(action.payload.Items) : action.payload.Items
        }
      };
    case actionTypes.INIT_HOUSE_BILLS:
      return {
        ...state,
        houseBills: { }
      }
    default:
      return state
  }
}

export default reducer
