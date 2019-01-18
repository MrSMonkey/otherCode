const initialState = {
  pictures: [],
  picturesLoading: false,
  selectData: {}, // 当前服务商数据
}

export const actionTypes = {
  GET_HOUSE_PICTURE: 'GET_HOUSE_PICTURE',
  GET_HOUSE_PICTURE_SUCCESS: 'GET_HOUSE_PICTURE_SUCCESS',
  GET_HOUSE_SELECT_DATA: 'GET_HOUSE_SELECT_DATA'
}

export const actions = {
  getHousePicture(id) {
    return {
      type: actionTypes.GET_HOUSE_PICTURE,
      id
    }
  },
  getSelectData(data) {
    return {
      type: actionTypes.GET_HOUSE_SELECT_DATA,
      payload: data
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOUSE_PICTURE:
      return {
        picturesLoading: true
      }
    case actionTypes.GET_HOUSE_PICTURE_SUCCESS:
      const data = action.payload
      return {
        picturesLoading: false,
        pictures: action.payload,
        selectData: (data && data.length > 0) ? data[0].houseRoomCommonDTO : {}
      }
    case actionTypes.GET_HOUSE_SELECT_DATA:
      return {
        ...state,
        selectData: action.payload
      }
    default:
      return state
  }
}

export default reducer
