const initialState = {
  serviceTypeList: [],
  loading: false,
}

export const actionTypes = {
  GET_SERVICE_TYPE_LIST: 'GET_SERVICE_TYPE_LIST',
  GET_SERVICE_TYPE_LIST_SUCCESS: 'GET_SERVICE_TYPE_LIST_SUCCESS'
}

export const actions = {
  getServiceTypeList(id) {
    return {
      type: actionTypes.GET_SERVICE_TYPE_LIST,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVICE_TYPE_LIST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_SERVICE_TYPE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypeList: action.payload
      }
   
    default:
      return state
  }
}

export default reducer
