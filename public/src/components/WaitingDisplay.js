import React, { Component } from 'react';
require('../../styles/WaitingDisplay.scss')


class WaitingDisplay extends Component {
  render() {
  	const { request_status } = this.props
    return (
      <div>
      {request_status==='REQUESTING_RESULTS' ? 
      <div className="loading"></div>:null
  	  }	
      </div>
    );
  }
}

export default WaitingDisplay
