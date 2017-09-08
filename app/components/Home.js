import React from 'react'
var Link = require('react-router-dom').Link

export class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Github Battle</h1>
        <h2>Battle Your Friends! ... and stuff.</h2>

        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
    )
  }
}
