import React, { Component } from 'react';

class LocalSearchButton extends Component {
  render() {
  	const { search_yelp } = this.props
    return (
      <button onClick = {()=>{
      	search_yelp('Baltimore')
      }}>Search in Baltimore</button>
    );
  }
}

export default LocalSearchButton