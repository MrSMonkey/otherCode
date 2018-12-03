const initialState = {
  isModle: false,
  isShow: false,
  status: false,
}

export const actionTypes = {
  CHANGE_MOLDE_SHOW: 'CHANGE_MOLDE_SHOW',
  STATUS: 'STATUS',
  IS_MODLE: 'IS_MODLE',
  IS_SHOW: 'IS_SHOW'
}

export const actions = {
  showModle() {
    return {
      type: actionTypes.CHANGE_MOLDE_SHOW
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STATUS:
      return {
        ...state,
        status: action.payload
      }
    case actionTypes.IS_MODLE:
      return {
        ...state,
        isModle: action.payload
      }
    case actionTypes.IS_SHOW:
      return {
        ...state,
        isShow: action.payload
      }
    default:
      return state
  }
}

export default reducer
