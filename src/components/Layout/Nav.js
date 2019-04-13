import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'


class Nav extends Component {

    state = {
        searchTerm: ""
    }

    handleChange = (e) => {
       this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
       e.preventDefault();
       this.props.searchFor(this.state.searchTerm)
       this.props.history.push(`/`)
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper white">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                        <input id="searchTerm" type="search" required placeHolder="Search for Artist, Album or Track name ..." onChange={this.handleChange}/>
                        <label className="label-icon" for="search"><i className="material-icons grey-text text-darken-2">search</i></label>
                        <i className="material-icons grey-text text-darken-2">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
}


const mapDispatchToProps = dispatch => ({ searchFor: searchTerm => dispatch({ type: 'NEW_SEARCH', searchTerm })})
export default connect(null, mapDispatchToProps)(withRouter(Nav));
