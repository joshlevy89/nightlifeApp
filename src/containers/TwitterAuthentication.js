import React, { Component } from 'react';
import { connect } from 'react-redux'

class TwitterAuthentication extends Component {
  render() {
    return (
    	<div>
    	<a href = 'http://127.0.0.1:2999/auth/twitter/'>Log In with Twitter</a>
    	</div>
    );
  }
}

export default TwitterAuthentication