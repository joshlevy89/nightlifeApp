import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
require('../../styles/TwitterAuthentication.scss')

class TwitterAuthentication extends Component {
  render() {
    var isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      var url = 'https://joshlevy89-nightlife-app.herokuapp.com/auth/twitter/'
    }
    else {
      var url = 'http://127.0.0.1:3000/auth/twitter/'
    }
    return (
    	<div className="TwitterLoginButtonDiv">
    		<a href = {url}>
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