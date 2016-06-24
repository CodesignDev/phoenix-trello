import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Phoenix Trello</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Index);
