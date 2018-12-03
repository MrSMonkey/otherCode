const initialState = {
  form: {
    Name: '',
    Phone: '',
    CityId: '278',
    CommunityName: '',
  },
  isLoading: false,
  communityList: [],
  communityKey: ''
}

export const actionTypes = {
  ENTRUST_FORM: 'ENTRUST_FORM',
  SUBLIMT_FORM: 'SUBLIMT_FORM',
  SUBLIMT_FORM_SUCCESS: 'SUBLIMT_FORM_SUCCESS',
  CHANGE_ENTRUS_SUBLIMT_LODING: 'CHANGE_ENTRUS_SUBLIMT_LODING',
  COMMUNITYLIST: 'COMMUNITYLIST',
  COMMUNITYKEY: 'COMMUNITYKEY'
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
  sreachCommunity(val) {
    return {
      type: actionTypes.COMMUNITYKEY,
      text: val
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
    default:
      return state
  }
}

export default reducer
