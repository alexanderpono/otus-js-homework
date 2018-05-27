import React, { Component } from 'react';
import logo from '../logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

class Header extends Component {
  render() {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React!!!!!</h1>
            </header>

            <Navigation links={this.props.menu}/>
        </div>
    );
  }
}

export default Header;
