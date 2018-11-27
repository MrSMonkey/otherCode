
const initialState = {
  params: {
    walletId: '',
    pageIndex: 1,
    pageSize: 20
  },
  data: [1,2,3,4,5,6,7,8,9,10],
  isLoadingMore: false
}

export const actionTypes = {
  HIDE_ERROR_MEG: 'HIDE_ERROR_MEG',
  GET_RECORD: 'GET_RECORD',
  GET_BANK_LIST: 'GET_BANK_LIST',
  GET_RECORD_LIST_SUCCESS: 'GET_RECORD_LIST_SUCCESS',
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING'
}

export const actions = {
  getRecord(params) {
    return {
      type: actionTypes.GET_RECORD,
      payload: {
        params:params
      }
    }
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECORD:
      return {
        ...state,
        params: action.payload
    }
    case actionTypes.GET_RECORD_LIST_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        ...action.payload
    }
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        isLoadingMore: true,
    }
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        isLoadingMore: false,
    }
    default:
      return state
  }
}

export default reducer
