const initialState = {
  income: ''
}

export const actionTypes = {
  UPDATE_FORTUNE_INCOME: 'UPDATE_FORTUNE_INCOME'
}

export const actions = {
  updateFortuneIncome(value) {
    if (/\./.test(value)) {
      /* 限制2位小数 */
      let valuePart = value.split('.')
      value = valuePart[0] + '.' + valuePart[1].slice(0, 2)
    }
    return {
      type: actionTypes.UPDATE_FORTUNE_INCOME,
      payload: value
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORTUNE_INCOME:
      return {
        ...state,
        income: action.payload
      }
    default:
      return state
  }
}

export default reducer
