import React, { Component } from 'react';
require('../styles/Result.scss')

class Result extends Component {
  render() {
  	const { result, mark_attending, mark_remove, user_name } = this.props
    var path = window.location.pathname 
    return (
      <div className = "result">
      <a href={result.business.url} target="_blank">
        <img className = "thumbImage" src={result.business.image_url}/>
      </a>
      <div>{result.business.name}</div>
      <span className = "info">
      <div>Rating: {result.business.rating}</div>
      <div>Phone: {result.business.display_phone}</div>
      </span>
      {path==="/search" ? 
      <div>
      <a href="#" onClick={()=>mark_attending(result.business.id, user_name)}>
      Attend Event
      </a>
      <div>Attendees: {result.num_attending}</div>
      </div>
      :
      <a href="#" onClick = {()=>mark_remove(result.business.id,user_name)}>Remove</a>
      }
      </div>
    );
  }
}

export default Result
