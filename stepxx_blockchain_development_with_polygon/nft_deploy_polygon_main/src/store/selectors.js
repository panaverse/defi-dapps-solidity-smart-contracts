import { createSelector } from 'reselect'
import { get } from 'lodash'

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const network = state => get(state, 'web3.network')
export const networkSelector = createSelector(network, n => n)

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const balance = state => get(state, 'web3.balance', 0)
export const balanceSelector = createSelector(balance, e => e)

const contract = state => get(state, 'contract.contract')
export const contractSelector = createSelector(contract, c => c)

const metadata = state => get(state, 'contract.metadata')
export const metadataSelector = createSelector(metadata, m => m)

const nftState = state => get(state, 'contract.state')
export const nftStateSelector = createSelector(nftState, s => s)

const metadataLoaded= state => get(state, 'contract.loaded', false)
export const metadataLoadedSelector = createSelector(metadataLoaded, l => l)

const nftStateLoaded = state => get(state, 'contract.state', false)
export const nftStateLoadedSelector = createSelector(nftStateLoaded, b => b)
