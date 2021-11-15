import React, { Component } from 'react';
import Identicon from 'react-identicons';
import wmwc from '../logos/wmwc.png';
import wmmm from '../logos/wmmm.png';
import all from '../logos/all.png';
import eth from '../logos/eth.png';
import mm from '../logos/mm.png';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ width: '750px' }}>
          <span>
            { this.props.provider===null && !this.props.account
              ? <figure>
                  <img src={all} className="App-logo" alt="logo" width='256px'/>
                  <figcaption
                    style={{ width: '512px', fontSize: '15px'}}
                    className="text-right text-monospace text-dark">
                    Connection:<br></br>
                    <b>None</b>
                  </figcaption>
                </figure>
              : this.props.provider===null && this.props.account!==null
                ? <figure>
                    <img src={mm} className="App-logo" alt="logo" width='256px'/>
                    <figcaption
                      style={{ width: '512px', fontSize: '15px'}}
                      className="text-right text-monospace text-dark">
                      Connection:<br></br>
                      <b>MetaMask</b>
                    </figcaption>
                  </figure>
                :  this.props.provider.isMetaMask
                     ?  <figure>
                          <img src={wmmm} className="App-logo" alt="logo" width='256px'/>
                          <figcaption
                            style={{ width: '512px', fontSize: '15px'}}
                            className="text-right text-monospace text-dark">
                            Connection:<br></br>
                            <b>Web3Modal+MetaMask</b>
                          </figcaption>
                        </figure>
                     :  <div>
                          <figure>
                            <img src={wmwc} className="App-logo" alt="logo" width='256px'/>
                            <figcaption
                              style={{ width: '512px', fontSize: '15px'}}
                              className="text-right text-monospace text-dark">
                              Connection:<br></br>
                              <div className="row">
                                <div className="col">
                                  <span
                                    type="submit"
                                    onClick={(e) => this.props.offQr(e)}
                                    className="text-danger bg-dark"
                                    style={{ height: '15px', fontSize: '15px'}}
                                    ><b>Disconnect&off Qr Code</b>
                                  </span>
                                </div>
                                <div className="col">
                                  <b>Web3Modal+WalletConnect</b>
                                </div>
                              </div>
                            </figcaption>
                          </figure>
                        </div>
            }
          </span>
          <p></p>&nbsp;
          <table className="table-sm table-bordered border-dark text-monospace table-responsive overflow-hidden" style={{ width: '750px', height: '74px' }}>
            <thead>
              <tr className="bg-dark text-white">
                <th>Account</th>
                <th>Balance</th>
                <th>Network</th>
              </tr>
              <tr>
                {  !  this.props.account && ! this.props.loading //Update Account
                   ?  <td style={{ width: '500px' }}>
                        ---
                      </td>
                   :  ! this.props.account && this.props.loading  && ! this.props.onlyNetwork
                        ? <td style={{ width: '500px'}}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </td>
                        : ! this.props.account && this.props.loading  && this.props.onlyNetwork
                            ?  <td style={{ width: '500px' }}>
                                ---
                               </td> 
                            :  <td style={{ width: '500px'}}>
                                  <Identicon string={this.props.account} size="20" className='align-text-bottom' bg='#343A40'/>&nbsp;
                                  { this.props.network==='mainnet'
                                    ? <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={"https://etherscan.io/address/" + this.props.account}>
                                        <b>{this.props.account}</b>
                                      </a>
                                    : <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://${this.props.network+'.'}etherscan.io/address/`+this.props.account}>
                                        <b>{this.props.account}</b>
                                      </a>
                                  }
                                </td>
                }{ !  this.props.balance && ! this.props.loading //Update Balance
                   ?  <td style={{ width: '125px'}}>
                        ---
                      </td>
                   :  ! this.props.balance && this.props.loading && ! this.props.onlyNetwork
                        ? <td style={{ width: '125px'}}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                          </td>
                        : ! this.props.balance && this.props.loading && this.props.onlyNetwork
                          ?  <td style={{ width: '125px'}}>
                              ---
                             </td>
                          : <td style={{ width: '125px' }}>
                              <b>{(this.props.balance/10**18).toFixed(5)}</b>
                              <img src={eth} className="align-text-bottom" height="20" alt="id" />
                            </td>
                }{ !  this.props.network && ! this.props.loading && ! this.props.onlyNetwork //Update Network
                   ?  <td style={{ width: '125px'}}>
                        ---
                      </td>
                   :  ! this.props.network && this.props.loading && this.props.onlyNetwork
                        ? <td style={{ width: '125px'}}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                          </td>
                        : <td style={{ width: '125px'}}>
                            <b>{this.props.network}</b>
                          </td>
                }
              </tr>
            </thead>
          </table>
            &nbsp;
            { !  this.props.account && ! this.props.loading //Update "Send 1 Wei to yourself" Button
              ?  <div className="row text">&nbsp;&nbsp;</div>
              :  !  this.props.account && this.props.loading && ! this.props.onlyNetwork
                 ?  <div className="row text-center text-monospace">
                      <button
                        type="button"
                        onClick={(e) => this.props.send(e)}
                        className="btn btn-primary btn-sm mx-auto"
                        style={{ width: '375px', fontSize: '17px' }}
                        disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                 :  ! this.props.account && this.props.loading && this.props.onlyNetwork
                    ? <div className="row text">&nbsp;&nbsp;</div>
                    : <div className="row text-center text-monospace">
                        <button
                          type="submit"
                          onClick={(e) => this.props.send(e)}
                          className="btn btn-primary btn-sm mx-auto"
                          style={{ width: '375px', fontSize: '17px' }}
                          ><b>Send 1 wei to yourself</b>
                        </button>
                      </div>

            }
        </main>
      </div>
    );
  }
}

export default Main;