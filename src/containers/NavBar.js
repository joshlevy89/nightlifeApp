import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux' 

class NavBar extends Component{
  render() {
    const { dispatch } = this.props
    return (
    <div>
    <Navbar>
    	<Navbar.Header>
	      	<Navbar.Brand>
	        	<a>Nightlife App</a>
	      	</Navbar.Brand>
   		</Navbar.Header>
	    <Nav>
	      	<NavItem onClick = {()=>browserHistory.push('/signin')} >Sign In</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/search')} >Search</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/places_attending')} >My Places</NavItem>
	    </Nav>
  	</Navbar>
  	        {this.props.children}
  	</div>
    );
  }
};

NavBar = connect()(NavBar)

export default NavBar
