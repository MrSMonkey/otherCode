const initialState = {
  serviceList: [],
  loading: false
}

export const actionTypes = {
  GET_LANDLORD_LIST: 'GET_LANDLORD_LIST',
  GET_LANDLORD_LIST_SUCCESS: 'GET_LANDLORD_LIST_SUCCESS',
  GET_SERVICE_LIST: 'GET_SERVICE_LIST',
  GET_SERVICEORDER_LIST_SUCCESS: 'GET_SERVICEORDER_LIST_SUCCESS',
  HOUSE_INFO: 'HOUSE_INFO',
  GET_HOUSE_TIMELINE: 'GET_HOUSE_TIMELINE',
  HOUSE_TIMELINE: 'HOUSE_TIMELINE',
  GET_ROOM_LIST: 'GET_ROOM_LIST',
  ROOM_LIST: 'ROOM_LIST',
}

export const actions = {
  getServiceOrderList() {
    return {
      type: actionTypes.GET_LANDLORD_LIST,
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LANDLORD_LIST:
      return {
        loading: true
      }
    case actionTypes.GET_SERVICEORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceList: {
          ...action.payload
        }
      }
   
    default:
      return state
  }
}

export default reducer
