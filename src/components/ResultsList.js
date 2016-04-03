import React, { Component } from 'react';
import Result from './Result'

class ResultsList extends Component {
  render() {
  	const { results } = this.props
    return (
      <div>
      {/* List of results */}
      {results.map(result=>{
        return <div key={result.name}><Result {...this.props} result={result}/></div>
      })}
      </div>
    );
  }
}

export default ResultsList
