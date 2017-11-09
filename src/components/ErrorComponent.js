import React, { Component } from 'react'

export default class ErrorComponent extends Component{

  render(){
    return (
      <div>
        <p>{this.props.errorType}</p>
        <p>{this.props.errorMessage}</p>
      </div>
    )
  }
}
