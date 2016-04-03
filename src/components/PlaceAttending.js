import React, { Component } from 'react';

class PlaceAttending extends Component {
  render() {
  	const { place } = this.props
    return (
      <div>
      <a href = {place.business.url} target='_blank'>
      <button>
      <img src={place.business.image_url}/>
      {place.business.name}
      <div>
      {place.business.location.city}
      </div>
      </button>
      </a>
      </div>
    );
  }
}

export default PlaceAttending