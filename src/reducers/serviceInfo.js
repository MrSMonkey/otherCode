const initialState = {
  serviceInfoData: {},
  loading: false,
  comfirmLoading: false
}

export const actionTypes = {
  GET_SERVICES_INFO: 'GET_SERVICES_INFO',
  LOADING_SUCCESS: 'LOADING_SUCCESS',
  GET_SERVICES_INFO_SUCCESS: 'GET_SERVICES_INFO_SUCCESS',
  GET_HOUSE_SELECT_DATA: 'GET_HOUSE_SELECT_DATA',
  SUBMIT_FORM: 'SUBMIT_FORM',
  SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS'
}

export const actions = {
  getServiceInfo(id) {
    return {
      type: actionTypes.GET_SERVICES_INFO,
      id
    }
  },
  getSelectData(data) {
    return {
      type: actionTypes.GET_HOUSE_SELECT_DATA,
      data
    }
  },
  submitForm(data) {
    return {
      type: actionTypes.SUBMIT_FORM,
      data
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVICES_INFO:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOADING_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case actionTypes.GET_SERVICES_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceInfoData: action.payload,
      }
    case actionTypes.GET_HOUSE_SELECT_DATA:
      return {
        ...state,
        selectData: action.payload
      }
    case actionTypes.SUBMIT_FORM:
      return {
        ...state,
        comfirmLoading: true
      }
      case actionTypes.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        comfirmLoading: false
      }
    default:
      return state
  }
}

export default reducer
