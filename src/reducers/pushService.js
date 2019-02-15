const initialState = {
  comfrimLoading: false
}

export const actionTypes = {
  PUSH_SERVICE: 'PUSH_SERVICE',
  LOADING_SUCCESS: 'LOADING_SUCCESS',
  PUSH_SERVICE_SUCCESS: 'PUSH_SERVICE_SUCCESS'
}

export const actions = {
  submitData(data) {
    return {
      type: actionTypes.PUSH_SERVICE,
      data
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PUSH_SERVICE:
      return {
        comfrimLoading: true
      }
    case actionTypes.LOADING_SUCCESS:
      return {
        comfrimLoading: false
      }
    case actionTypes.PUSH_SERVICE_SUCCESS:
      return {
        ...state,
        comfrimLoading: false
      }
    default:
      return state
  }
}

export default reducer
