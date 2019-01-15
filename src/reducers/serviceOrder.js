const initialState = {
  serviceList: [],
}

export const actionTypes = {
  GET_LANDLORD_List: 'GET_LANDLORD_List',
  GET_LANDLORD_List_SUCCESS: 'GET_LANDLORD_List_SUCCESS',
  GET_SERVICE_LIST: 'GET_SERVICE_LIST',
  GET_SERVICE_LIST_SUCCESS: 'GET_SERVICE_LIST_SUCCESS',
  HOUSE_INFO: 'HOUSE_INFO',
  GET_HOUSE_TIMELINE: 'GET_HOUSE_TIMELINE',
  HOUSE_TIMELINE: 'HOUSE_TIMELINE',
  GET_ROOM_LIST: 'GET_ROOM_LIST',
  ROOM_LIST: 'ROOM_LIST',
}

export const actions = {
  getServiceList(id) {
    return {
      type: actionTypes.GET_SERVICE_LIST,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        serviceList: {
          ...action.payload
        }
      }
   
    default:
      return state
  }
}

export default reducer
