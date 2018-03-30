import React, { Component } from 'react';
import './Nav.css';
import MenuItem from './MenuItem';

class Navigation extends Component {
    render() {
        return (
            <div className="Nav">
                <ul>
                    {this.props.links.map((item, index) => (<MenuItem key={index} link={item} />))}
                </ul>
            </div>
        );
    }
}

export default Navigation;
