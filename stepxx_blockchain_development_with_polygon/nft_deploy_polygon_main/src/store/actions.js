export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3NetworkLoaded(network) {
  return {
    type: 'WEB3_NETWORK_LOADED',
    network
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

export function web3BalanceLoaded(balance) {
  return {
    type: 'WEB3_BALANCE_LOADED',
    balance
  }
}

export function contractLoaded(contract) {
  return {
    type: 'CONTRACT_LOADED',
    contract
  }
}

export function metadataLoaded(metadata) {
  return {
    type: 'METADATA_LOADED',
    metadata
  }
}

export function nftStateLoaded(state) {
  return {
    type: 'NFT_STATE_LOADED',
    state
  }
}