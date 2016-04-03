import React, { Component } from 'react';

class PlaceAttending extends Component {
  render() {
  	const { place } = this.props
    return (
      <div>
      {place.name}
      <div>
      {place.city}
      </div>
      </div>
    );
  }
}

export default PlaceAttending