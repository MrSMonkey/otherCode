const initialState = {
  houseInfo: {},
  roomList: [],
  timeLines: [],
  houseIncome: { TotalAmount: 0 },
  income: { TotalAmount: 0 },
  roomListLoading: false,
  incomeLoading: false,
  tabsData: [
    {
      name: 'houseInfo',
      text: '房源信息',
      href: '/houses/',
      active: true
    }, {
      name: 'roomInfo',
      text: '房间信息',
      href: '/rooms/',
      active: false
    }, {
      name: 'photo',
      text: '房源照片',
      href: '/house-pic/:houseId/:contractId',
      active: false
    }
  ]
}

export const actionTypes = {
  GET_LANDLORD_ROOM: 'GET_LANDLORD_ROOM',
  GET_LANDLORD_ROOM_SUCCESS: 'GET_LANDLORD_ROOM_SUCCESS',
  GET_LANDLORD_INCOME: 'GET_LANDLORD_INCOME',
  GET_LANDLORD_INCOME_SUCCESS: 'GET_LANDLORD_INCOME_SUCCESS',
  GET_HOUSE_INCOME: 'GET_HOUSE_INCOME',
  GET_HOUSE_INCOME_SUCCESS: 'GET_HOUSE_INCOME_SUCCESS',
  TABS_DATA: 'TABS_DATA',
  GET_HOUSE_INFO: 'GET_HOUSE_INFO',
  HOUSE_INFO: 'HOUSE_INFO',
  GET_HOUSE_TIMELINE: 'GET_HOUSE_TIMELINE',
  HOUSE_TIMELINE: 'HOUSE_TIMELINE',
  GET_ROOM_LIST: 'GET_ROOM_LIST',
  ROOM_LIST: 'ROOM_LIST',
}

export const actions = {
  getIncome() {
    return {
      type: actionTypes.GET_LANDLORD_INCOME
    }
  },
  getHouseIncome(houseId) {
    return {
      type: actionTypes.GET_HOUSE_INCOME,
      houseId
    }
  },
  getHouseInfo(id) {
    return {
      type: actionTypes.GET_HOUSE_INFO,
      id
    }
  },
  gethouseTimeLine(id) {
    return {
      type: actionTypes.GET_HOUSE_TIMELINE,
      id
    }
  },
  getRoomList(id) {
    return {
      type: actionTypes.GET_ROOM_LIST,
      id
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROOM_LIST:
      return {
        ...state,
        roomListLoading: true
      }
    case actionTypes.ROOM_LIST:
      return {
        ...state,
        roomListLoading: false,
        roomList: action.payload
      }
    case actionTypes.GET_LANDLORD_INCOME:
      return {
        ...state,
        incomeLoading: true
      }
    case actionTypes.GET_LANDLORD_INCOME_SUCCESS:
      return {
        ...state,
        incomeLoading: false,
        income: action.payload
      }
    case actionTypes.GET_HOUSE_INCOME:
      return {
        ...state,
        incomeLoading: true
      }
    case actionTypes.GET_HOUSE_INCOME_SUCCESS:
      return {
        ...state,
        incomeLoading: false,        
        houseIncome: {
          ...action.payload
        }
      }
    case actionTypes.HOUSE_INFO:
      return {
        ...state,
        houseInfo: action.payload
      }
    case actionTypes.HOUSE_TIMELINE:
      return {
        ...state,
        timeLines: action.payload
      }
    default:
      return state
  }
}

export default reducer
