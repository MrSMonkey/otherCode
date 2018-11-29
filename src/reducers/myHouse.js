const initialState = {
  houseInfo: {},
  roomList: [],
  houseIncome: { TotalAmount: 0 },
  income: { TotalAmount: 0 },
  roomListLoading: false,
  incomeLoading: false,
  tabsData: [
    {
      name: 'houseInfo',
      text: '房源信息',
      href: '/houses',
      active: true
    }, {
      name: 'roomInfo',
      text: '房间信息',
      href: '/rooms/:id',
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
  TABS_DATA: 'TABS_DATA'
}

export const actions = {
  getRoomList(houseId) {
    return {
      type: actionTypes.GET_LANDLORD_ROOM,
      houseId
    }
  },
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
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LANDLORD_ROOM:
      return {
        ...state,
        roomListLoading: true
      }
    case actionTypes.GET_LANDLORD_ROOM_SUCCESS:
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
    default:
      return state
  }
}

export default reducer
