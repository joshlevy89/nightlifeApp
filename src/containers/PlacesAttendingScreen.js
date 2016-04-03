import React, { Component } from 'react';
import { connect } from 'react-redux'
import PlaceAttending from '../components/PlaceAttending'
import { Link } from 'react-router'


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
      <div>
      {user_name === undefined ? 
      <div><Link to='/signin'>Sign in</Link></div>:null}
      <div><Link to='/search'>Search for bars</Link></div>
      {places_attending.length !== 0 ?
       places_attending.map(place=>{
        return (
        <div key={place.business.name}>
        <PlaceAttending {...this.props} place={place}/>
        </div>
        )
      }):<div>{message}</div>}
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
