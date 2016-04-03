import React, { Component } from 'react';

class Result extends Component {
  render() {
  	const { result, mark_attending, user_name } = this.props
    return (
      <button onClick={()=>mark_attending(result.business.id, user_name)}>
      <img src={result.business.image_url}/>
      {result.business.name}
      {result.num_attending}
      </button>
    );
  }
}

export default Result
