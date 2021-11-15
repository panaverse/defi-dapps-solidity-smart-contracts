import React, { Component } from 'react'
import { connect } from 'react-redux'
import Identicon from 'identicon.js';
import eth from '../images/eth.png'
import {
  accountSelector,
  balanceSelector,
  networkSelector,
  web3Selector
} from '../store/selectors'
import './Style.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg rounded-bottom navBorderBottom" style={{ color: "#55FF55", "backgroundColor": "#1D1D1D" }}>
        <a
          className="navbar-brand rounded"
          target="_blank"
          href="https://github.com/xternet/dapp_template_v2"
          style={{color: "#55FF55", border: "1mm ridge #55FF55" }}
          rel="noopener noreferrer"
        >
            <b>&nbsp;NFT M@$t3rcl@$$&nbsp;</b>
        </a>
          { this.props.account
          ? <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <div className="container">
                  <div className="row">
                    <div className="rounded network">
                      <li className="nav-item nav-link small">
                        <b>{this.props.network}</b>
                      </li>
                    </div>
                    <div className="rounded balance">
                      <li className="nav-item nav-link small">
                        <b>{this.props.balance}</b>
                        <img src={eth} width='18' height='18' alt="eth" />
                      </li>
                    </div>
                    <div className="rounded account">
                      <li className="nav-item nav-link small">
                        { this.props.network === 'Main' || this.props.network === 'Private' || this.props.network === 'Wrong network'
                        ? <b><a
                            style={{ color: "#55FF55" }}
                            href={`https://etherscan.io/address/` + this.props.account}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          {this.props.account.substring(0,5) + '...' + this.props.account.substring(38,42)}
                          &nbsp;
                          </a></b>
                        : <b><a
                            style={{color: "#55FF55"}}
                            href={`https://${this.props.network}.etherscan.io/address/` + this.props.account}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          {this.props.account.substring(0,6) + '...' + this.props.account.substring(38,42)}
                          </a></b>
                        }
                        <img
                          alt="id"
                          className="id border border-success"
                          width="20"
                          height="20"
                          src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        />
                      </li>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          : <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                { this.props.web3
                ? <button
                    type="Success"
                    className="btn btn-outline btn-block "
                    style={{ backgroundColor: "#55FF55", color: "#000000" }}
                    onClick={async () => {
                      try {
                        await window.ethereum.enable()
                      } catch (e) {
                        console.log(e)
                      }
                    }}
                  >
                    L o g i n
                  </button>
                : <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                      try {
                        window.open("https://metamask.io/")
                      } catch (e) {
                        console.log(e)
                      }
                    }}
                  >
                    Get MetaMask
                  </button>
                }
              </ul>
            </div>
          }
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    web3: web3Selector(state),
    account: accountSelector(state),
    network: networkSelector(state),
    balance: balanceSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar)