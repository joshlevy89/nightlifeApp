import React, { Component } from 'react';
import { connect } from 'react-redux'
import { search_yelp, mark_attending } from '../actions'
import WaitingDisplay from '../components/WaitingDisplay'
import ResultsList from '../components/ResultsList'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router'
require('../../styles/index.scss')

class SearchScreen extends Component {
  render() {
    return (
      <div className="mainLayout">
      {/* waiting display */}
      <WaitingDisplay {...this.props}/>
      {/* hardcoded Baltimore search 
      <LocalSearchButton {...this.props}/>
      */}
      {/* search bar for arbitrary search */}
      <SearchBar {...this.props}/>
      <ResultsList {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		request_status: state.search_info.request_status,
    results: state.search_info.results,
    user_name: state.user_info.user_name
	}
}

SearchScreen = connect(
mapStateToProps,
{ search_yelp, mark_attending }
)(SearchScreen)

export default SearchScreen
