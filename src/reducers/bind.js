const intialState = {
  phone: '',
  identifyingCode: '',
  bindLoading: false,
  isCheckingPhone: false,
  bindSuccess: false,
  checkError: ''
}

const actionTypes = {
  UPDATE_PHONE: 'UPDATE_PHONE',
  UPDATE_CODE: 'UPDATE_CODE',
  BIND_START: 'BIND_START',
  BIND_SUCCESS: 'BIND_SUCCESS',
  BIND_FAIL: 'BIND_FAIL',
  SET_PHONE_CHECK_STATUS: 'SET_PHONE_CHECK_STATUS',
  CHECK_PHONE: 'CHECK_PHONE',
  SET_CHECK_ERROR: 'SET_CHECK_ERROR',
  GEN_CODE: 'GEN_CODE'
}

const actions = {
  updatePhone(phone) {
    return {
      type: actionTypes.UPDATE_PHONE,
      phone
    }
  },
  updateCode(code) {
    return {
      type: actionTypes.UPDATE_CODE,
      code
    }
  },
  checkPhone() {
    return {
      type: actionTypes.CHECK_PHONE
    }
  },
  genCode() {
    return {
      type: actionTypes.GEN_CODE
    }
  },
  bindStart() {
    return {
      type: actionTypes.BIND_START
    }
  }
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PHONE:
      return {
        ...state,
        phone: action.phone
      }
    case actionTypes.UPDATE_CODE:
      return {
        ...state,
        identifyingCode: action.code
      }
    case actionTypes.SET_PHONE_CHECK_STATUS:
      return {
        ...state,
        isCheckingPhone: action.payload
      }
    case actionTypes.SET_CHECK_ERROR:
      return {
        ...state,
        checkError: action.payload
      }
    case actionTypes.BIND_START:
      return {
        ...state,
        bindLoading: true
      }
    case actionTypes.BIND_SUCCESS:
      return {
        ...state,
        bindSuccess: true,
        bindLoading: false
      }
    case actionTypes.BIND_FAIL:
      return {
        ...state,
        bindSuccess: false,
        bindLoading: false
      }

    default:
      return state
  }
}

export { actionTypes, actions }
export default reducer
