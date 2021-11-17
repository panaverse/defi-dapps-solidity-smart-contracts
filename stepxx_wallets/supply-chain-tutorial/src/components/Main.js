import React, { Component } from 'react';
import moment from 'moment'

const STATUSES = ['CREATED', 'SENT', 'RECEIVED']

class Main extends Component {

  render() {
    return (
      <div id='content'>
        <h1>{this.props.name}</h1>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Status</th>
              <th scope='col'>Custodian</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className='badge badge-success'>{STATUSES[this.props.status]}</span>
              </td>

              <td className='text-muted'>
                <small>{this.props.custodian}</small>
              </td>
              <td>
                <a
                  href={`http://localhost:3000?address=${this.props.contractAddress}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary'
                >
                  Share
                </a>
                &nbsp;
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    let recipient = window.prompt('Who would you like to send the asset to?')
                    this.props.sendAsset(recipient)
                  }}
                >
                  Send
                </button>
                &nbsp;
                <button
                  className='btn btn-primary'
                  onClick={() => this.props.receiveAsset() } > 
                  Receive
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>History</h2>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Event</th>
              <th scope='col'>Time</th>
              <th scope='col'>Account</th>
              <th scope='col'>Custodian</th>
            </tr>
          </thead>
          <tbody>
            { this.props.actions.map((action, key) => {
              return(
                <tr key={key}>
                  <td><span className='badge badge-dark'>{action.returnValues.name}</span></td>
                  <td><small>{moment.unix(action.returnValues.timestamp).format()}</small></td>
                  <td className='text-muted'><small>{action.returnValues.account}</small></td>
                  <td className='text-muted'><small>{action.returnValues.custodian}</small></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
