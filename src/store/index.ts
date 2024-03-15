import { createStore } from 'redux'

const DefaultValueState: any = {
  workerInfo: null,
  access_token: null,
  currency: [],
  languages: [],
  currencyCurrent: { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' },
  services: [],
  openMenu: null,
  typeOpenFinalPopupStore: null,
  cards_store: {}
}

function counterReducer(state: any = DefaultValueState, action: any) {
  switch (action.type) {
    case 'access_token':
      return { ...state, access_token: action.payload }
    case 'cards_store':
      return { ...state, cards_store: action.payload }
    case 'worker/info':
      return { ...state, workerInfo: action.payload }
    case 'currency':
      return { ...state, currency: [...action.payload] }
    case 'currencyCurrent':
      return { ...state, currencyCurrent: { ...action.payload } }
    case 'services':
      return { ...state, services: [...action.payload] }
    case 'toggle_menu':
      return { ...state, openMenu: !action.payload }
    case 'typeOpenFinalPopupStore':
      return { ...state, typeOpenFinalPopupStore: action.payload }
    default:
      return state
  }
}

let store = createStore(counterReducer)

export default store
