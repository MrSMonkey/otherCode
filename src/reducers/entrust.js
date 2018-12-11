const initialState = {
  form: {
    cityId: '510100',
    cityName: '成都',
    communityId: '',
    communityName: '',
    linkName: '',
    linkPhone: '',
    name: '',
    phone: '',
    varityCold: '',
  },
  isLoading: false,
  communityList: [],
  communityKey: '',
  isTips: false
}

export const actionTypes = {
  ENTRUST_FORM: 'ENTRUST_FORM',
  SUBLIMT_FORM: 'SUBLIMT_FORM',
  SUBLIMT_FORM_SUCCESS: 'SUBLIMT_FORM_SUCCESS',
  CHANGE_ENTRUS_SUBLIMT_LODING: 'CHANGE_ENTRUS_SUBLIMT_LODING',
  COMMUNITYLIST: 'COMMUNITYLIST',
  COMMUNITYKEY: 'COMMUNITYKEY',
  SEARCHCOMMUNITY: 'SEARCHCOMMUNITY',
  TIPS: 'TIPS'
}

export const actions = {
  changeForm(value, key) {
    return {
      type: actionTypes.ENTRUST_FORM,
      text: { [key]: value }
    }
  },
  sublimtEntrust() {
    return {
      type: actionTypes.SUBLIMT_FORM
    }
  },
  changeCommuntiyKey(val) {
    return {
      type: actionTypes.COMMUNITYKEY,
      text: val
    }
  },
  sreachCommunity() {
    return {
      type: actionTypes.SEARCHCOMMUNITY
    }
  },
  closeTips() {
    return {
      type: actionTypes.TIPS
    } 
  },
  clearCommunityList() {
    return {
      type: actionTypes.COMMUNITYLIST,
      payload: []
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENTRUST_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.text
        }
      }
    case actionTypes.CHANGE_ENTRUS_SUBLIMT_LODING:
      return {
        ...state,
        isLoading: action.payload
      }
    case actionTypes.COMMUNITYKEY:
      return {
        ...state,
        communityKey: action.text
      }
    case actionTypes.COMMUNITYLIST:
      return {
        ...state,
        communityList: action.payload
      }
    case actionTypes.SUBLIMT_FORM_SUCCESS:
      return {
        ...state,
        isTips: true,
        form: {
          cityId: '510100',
          cityName: '成都',
          communityId: '',
          communityName: '',
          linkName: '',
          linkPhone: '',
          name: '',
          phone: action.payload,
          varityCold: '',
        }
      }
    case actionTypes.TIPS:
      return {
        ...state,
        isTips: false
      }
    default:
      return state
  }
}

export default reducer
