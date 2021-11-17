import React, { Component } from 'react';

class Form extends Component {

  render() {
    return (
      <div id='content'>
        <h1>Create Asset</h1>
        <p>You must create a new asset before you can track it.</p>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.assetName.value
          this.props.createAsset(name)
        }}>
          <div className='form-group mr-sm-2'>
            <input
              id='assetName'
              type='text'
              ref={(input) => { this.assetName = input }}
              className='form-control'
              placeholder='Asset Name'
              required />
          </div>
          <button type='submit' className='btn btn-primary'>Add Asset</button>
        </form>
      </div>
    );
  }
}

export default Form;
