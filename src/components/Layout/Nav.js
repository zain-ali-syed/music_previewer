import React from 'react';

const Nav = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
            <form>
                <div className="input-field">
                <input id="search" type="search" required placeHolder="Search for Artist, Album or Track name ..."/>
                <label className="label-icon" for="search"><i className="material-icons grey-text text-darken-2">search</i></label>
                <i className="material-icons grey-text text-darken-2">close</i>
                </div>
            </form>
            </div>
      </nav>
    );
};

export default Nav;