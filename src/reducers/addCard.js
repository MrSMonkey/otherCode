const intialState = {
  data: {}, // 银行卡列表
  UsableAmount: '0', // 可用余额
  cardNo: ''
}

const actionTypes = {
  GET_CARD_BIN_SUCCESS: 'GET_CARD_BIN_SUCCESS',
  GET_CARD_BIN: 'GET_CARD_BIN',
  GET_USABLE_AMOUNT: 'GET_USABLE_AMOUNT'
}

const actions = {
  getcardbin(val) {
    return {
      type: actionTypes.GET_CARD_BIN,
      payload: {
        cardNo: val
      }
    }
  },
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARD_BIN:
      return {
        ...state,
        cardNo: action.payload
      }
    case actionTypes.GET_USABLE_AMOUNT:
      return {
        ...state,
        UsableAmount: action.payload
      }
    default:
      return state
  }
}

export { actionTypes, actions }
export default reducer
