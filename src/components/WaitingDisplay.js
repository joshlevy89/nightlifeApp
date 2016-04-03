import React, { Component } from 'react';

class WaitingDisplay extends Component {
  render() {
  	const { request_status } = this.props
    return (
      <div>
      {request_status==='REQUESTING_RESULTS' ? 
      'Waiting...':null
  	  }	
      </div>
    );
  }
}

export default WaitingDisplay
