
const initialState = {
  data: {}, // 钱包
  isFrozen: false, // 是否被冻结
}

export const actionTypes = {
  HIDE_ERROR_MEG: 'HIDE_ERROR_MEG',
  GET_WALLET_SUCCESS: 'GET_WALLET_SUCCESS',
  GET_WALLET_INFO: 'GET_WALLET_INFO',
  HIDE_LOADING: 'HIDE_LOADING',
  IS_FROZEN: 'IS_FROZEN',
  GET_WALLET: 'GET_WALLET'
  
}

export const actions = {
  getWalletInfo() {
    return {
      type: actionTypes.GET_WALLET_INFO
    }
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WALLET_SUCCESS:
      return {
        ...state,
        isBankListLoading: false,
        data: action.payload
    }
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        isBankListLoading: false,
    }
    case actionTypes.IS_FROZEN:
      return {
        ...state,
        isFrozen: action.payload,
    }
    default:
      return state
  }
}

export default reducer
