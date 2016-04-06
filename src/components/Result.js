import React, { Component } from 'react';
require('../styles/Result.scss')

class Result extends Component {
  render() {
  	const { result, mark_attending, mark_remove, user_name } = this.props
    var path = window.location.pathname 
    return (
      <div className = "result">
      <img className = "thumbImage" src={result.business.image_url}/>
      <div>{result.business.name}</div>
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
