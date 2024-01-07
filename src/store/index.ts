import { createStore } from 'redux'

const DefaultValueState: any = {
  workerInfo: null,
  access_token: null,
  currency: [],
  languages: [],
  currencyCurrent: { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' },
  services: [],
}

function counterReducer(state: any = DefaultValueState, action: any) {
  switch (action.type) {
    case 'access_token':
      return { ...state, access_token: action.payload }
    case 'worker/info':
      return { ...state, workerInfo: action.payload }
    case 'currency':
      return { ...state, currency: [...action.payload] }
    case 'currencyCurrent':
      return { ...state, currencyCurrent: { ...action.payload } }
    case 'services':
      return { ...state, services: [...action.payload] }
    default:
      return state
  }
}

let store = createStore(counterReducer)

export default store
