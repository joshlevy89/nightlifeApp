import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
require('../../styles/TwitterAuthentication.scss')

class TwitterAuthentication extends Component {
  render() {
    return (
    	<div className="TwitterLoginButtonDiv">
    		<a href = 'http://127.0.0.1:3000/auth/twitter/'>
	    		<Button bsStyle="primary" bsSize="lg">
	    		Sign in with Twitter
          <i className="fa fa-twitter TwitterLogo"></i>
	    		</Button>
	    	</a>
    	</div>
    );
  }
}

export default TwitterAuthentication