const initialState = {
  pictures: {},
  picturesLoading: false
}

export const actionTypes = {
  GET_HOUSE_PICTURE: 'GET_HOUSE_PICTURE',
  GET_HOUSE_PICTURE_SUCCESS: 'GET_HOUSE_PICTURE_SUCCESS'
}

export const actions = {
  getHousePicture(id) {
    return {
      type: actionTypes.GET_HOUSE_PICTURE,
      id
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
      return {
        picturesLoading: false,
        pictures: action.payload
      }
    default:
      return state
  }
}

export default reducer
