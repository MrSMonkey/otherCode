const initialState = {
  data: {},
  rooms: [],
  loading: false
}

export const actionTypes = {
  GET_PUSH_SERVICE_DETILE: 'GET_PUSH_SERVICE_DETILE',
  LOADING_SUCCESS: 'LOADING_SUCCESS',
  GET_SERVICE_DETILE_SUCCESS: 'GET_SERVICE_DETILE_SUCCESS'
}

export const actions = {
  getHouseData(id) {
    return {
      type: actionTypes.GET_PUSH_SERVICE_DETILE,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PUSH_SERVICE_DETILE:
      return {
        loading: true
      }
    case actionTypes.GET_SERVICE_DETILE_SUCCESS:
      let arr = [];
      arr = action.payload.rooms.map((item, index) => {
        return {
          value: item.roomId || `${index}`,
          label: item.roomName || ''
        }
      })
      return {
        ...state,
        loading: false,
        rooms: arr,
        data: action.payload
      }
    default:
      return state
  }
}

export default reducer
