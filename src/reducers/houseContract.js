const initialState = {
  contractInfo: { LandlordInfo: {} },
  contractInfoLoading: false
}

export const actionTypes = {
  GET_HOUSE_CONTRACT: 'GET_HOUSE_CONTRACT',
  GET_HOUSE_CONTRACT_SUCCESS: 'GET_HOUSE_CONTRACT_SUCCESS'
}

export const actions = {
  getHousecontract(id) {
    return {
      type: actionTypes.GET_HOUSE_CONTRACT,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOUSE_CONTRACT:
      return {
        contractInfoLoading: true
      };
    case actionTypes.GET_HOUSE_CONTRACT_SUCCESS:
      return {
        contractInfoLoading: false,
        contractInfo: action.payload || { LandlordInfo: {} }
      };
    default:
      return state
  }
}

export default reducer
