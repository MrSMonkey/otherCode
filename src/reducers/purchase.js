const initialState = {
  serviceList: [],
  Loading: false,
}

export const actionTypes = {
  GET_SERVICES_LIST: 'GET_SERVICES_LIST',
  GET_SERVICE_LIST_SUCCESS: 'GET_SERVICE_LIST_SUCCESS',
  GET_HOUSE_SELECT_DATA: 'GET_HOUSE_SELECT_DATA'
}

export const actions = {
  getServiceList(id) {
    return {
      type: actionTypes.GET_SERVICES_LIST,
      id
    }
  },
  getSelectData(data) {
    return {
      type: actionTypes.GET_HOUSE_SELECT_DATA,
      data
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVICES_LIST:
      return {
        Loading: true
      }
    case actionTypes.GET_SERVICE_LIST_SUCCESS:
      return {
        Loading: false,
        serviceList: action.payload,
      }
    case actionTypes.GET_HOUSE_SELECT_DATA:
      return {
        selectData: action.payload
      }
    default:
      return state
  }
}

export default reducer
