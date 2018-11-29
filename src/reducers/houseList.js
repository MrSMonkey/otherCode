const initialState = {
  data: [{CommunityName: '天香 2栋3单元33楼3301号', isRegister: true}, {CommunityName: '天香 2栋3单元33楼3301号', isRegister: false}],
  indexHouse: {},
  indexHouseId: '',
  isHouseListLoading: false
}

export const actionTypes = {
  GET_HOUSE_LIST: 'GET_HOUSE_LIST',
  GET_HOUSE_LIST_SUCCESS: 'GET_HOUSE_LIST_SUCCESS',
  GET_HOUSE_LIST_FAIL: 'GET_HOUSE_LIST_FAIL',
  CHANGE_HOUSE_LIST_LOADING:'CHANGE_HOUSE_LIST_LOADING',
  INDEX_HOUSE_INFO: 'INDEX_HOUSE_INFO',
  INDEX_HOUSE_ID: 'INDEX_HOUSE_ID'
}

export const actions = {
  getHouseList(indexHouseId) {
    return {
      type: actionTypes.GET_HOUSE_LIST,
      indexHouseId
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOUSE_LIST:
      return {
        ...state,
        isHouseListLoading: true
      }
    case actionTypes.GET_HOUSE_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isHouseListLoading: false
      }
    case actionTypes.GET_HOUSE_LIST_FAIL:
    case actionTypes.CHANGE_HOUSE_LIST_LOADING:
      return {
        ...state,
        isHouseListLoading: false
      }
    case actionTypes.INDEX_HOUSE_INFO:
      return {
        ...state,
        indexHouse: action.payload
      }
    default:
      return state
  }
}

export default reducer
