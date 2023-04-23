import { combineReducers } from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'WEB3_NETWORK_LOADED':
      return { ...state, network: action.network }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'WEB3_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'CONTRACT_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'METADATA_LOADED':
      return { ...state, loaded: true, metadata: action.metadata }
    case 'NFT_STATE_LOADED':
      return { ...state, loaded: true, state: action.state }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  contract
})

export default rootReducer