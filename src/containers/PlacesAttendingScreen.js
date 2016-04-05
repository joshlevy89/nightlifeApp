import React, { Component } from 'react';
import { connect } from 'react-redux'
import Result from '../components/Result'
import TwitterAuthentication from './TwitterAuthentication'
import { Router } from 'react-router'
require('../styles/index.scss')
require('../styles/PlacesAttendingScreen.scss')

class PlacesAttendingScreen extends Component {
  render() {
  	const { places_attending, user_name } = this.props

    // display message depending on log in status/if have places attending
    var message = null
    // if not logged in
    if (user_name === undefined) {
        message = "You must be logged in to view your places!"
    }
    // if logged in, but not yet attending any places
    else if (places_attending.length===0) {
        message = "You are not yet attending any places!"
    }
    return (
      <div className="mainLayout">
      <h3 className="title">My Places</h3>
      {places_attending.length !== 0 ?
       places_attending.map(place=>{
        return (
        <div key={place.business.name}>
        <Result {...this.props} result={place} mark_attending="null"/>
        </div>
        )
      }):<h4 className="message">{message}</h4>}
      {user_name === undefined ? 
      <TwitterAuthentication/>:null}
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		places_attending: state.user_info.places_attending,
    user_name: state.user_info.user_name
	}
}

PlacesAttendingScreen = connect(
mapStateToProps
)(PlacesAttendingScreen)

export default PlacesAttendingScreen
