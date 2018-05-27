import React, { Component } from 'react';

class MenuItem extends Component {
  render() {
    return (
        <li><a href={this.props.link.ref}>{this.props.link.text}</a></li>
    );
  }
}

export default MenuItem;
