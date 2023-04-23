import React, { Component } from 'react';
import wallet from '../logos/wallet.png';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace text-white">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://github.com/panacloud-modern-global-apps/defi-dapps-solidity-smart-contracts"
          target="_blank"
          rel="noopener noreferrer"
        > 
        <img src={wallet} className="App-logo" alt="logo" height="32"/>
          <b> DApp Wallet </b>
        </a>
          <ul className="navbar-nav px-3 text-white">
            { ! this.props.account && ! this.props.loading
              ? <div className="row text-center text-monospace">
                  <button
                    type="submit"
                    onClick={(e) => this.props.on(e)}
                    className="btn btn-outline-success btn-sm"
                    style={{ width: '125px', fontSize: '17px'}}
                    ><b>Connect</b>
                  </button>&nbsp;
                </div>
              : ! this.props.account && this.props.loading
                ? <div className="row text-center text-monospace">
                    <button
                      type="submit"
                      className="btn btn-outline-success btn-sm"
                      style={{ width: '125px', fontSize: '17px'}}
                      disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </button>&nbsp;
                  </div>
                : <div className="row text-center text-monospace">
                    <button
                      type="submit"
                      onClick={(e) => this.props.off(e)}
                      className="btn btn-outline-danger btn-sm"
                      style={{ width: '125px', fontSize: '17px'}}
                      >Disconnect
                    </button>&nbsp;
                  </div>
            }
          </ul>
      </nav>
    );
  }
}

export default Navbar;