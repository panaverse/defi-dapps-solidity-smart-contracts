//WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    payload: connection
  }
}

export function web3NetworkLoaded(network) {
  return {
    type: 'WEB3_NETWORK_LOADED',
    payload: network
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    payload: account
  }
}

export function web3BalanceLoaded(balance) {
  return {
    type: 'WEB3_BALANCE_LOADED',
    payload: balance
  }
}

export function toggleTheme() {
  return {
    type: "toggleTheme"
  }
}

export function increment() {
  return {
    type: "increment"
  }
}

export function decrement() {
  return {
    type: "decrement"
  }
}