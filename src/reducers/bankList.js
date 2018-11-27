
const initialState = {
  data: [], // 银行卡列表
  isBankListLoading: false
}

export const actionTypes = {
  HIDE_ERROR_MEG: 'HIDE_ERROR_MEG',
  GET_BANK_LIST_SUCCESS: 'GET_BANK_LIST_SUCCESS',
  GET_BANK_LIST: 'GET_BANK_LIST',
  HIDE_LOADING: 'HIDE_LOADING'
}

export const actions = {
  getBankList() {
    return {
      type: actionTypes.GET_BANK_LIST
    }
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BANK_LIST_SUCCESS:
      return {
        ...state,
        isBankListLoading: false,
        ...action.payload
    }
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        isBankListLoading: false,
    }
    default:
      return state
  }
}

export default reducer
