const intialState = {
  data: {}
}

const actionTypes = {
  SUBMIT_FROM:'SUBMIT_FROM',
  CHANGE_FROM: 'CHANGE_FROM'
}

const actions = {
  submitForm() {
    return {
      type: actionTypes.SUBMIT_FROM,
    }
  },
  changeFrom (data) {
    return {
      type: actionTypes.CHANGE_FROM,
      payload: {
        data: data
      }
    }
  }
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FROM:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export { actionTypes, actions }
export default reducer
