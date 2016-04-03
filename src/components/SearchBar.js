import React, { Component } from 'react';

class SearchBar extends Component {
  
  handleKeyPress(inputValue,key) {
  	const { search_yelp } = this.props
  	if (key === 'Enter') {
  		search_yelp(inputValue)
  	}
  }

  render() {
    return (
     <input ref="searchBar" 
     onKeyPress={e=>this.handleKeyPress(this.refs.searchBar.value,e.key)}/>
    );
  }
}

export default SearchBar