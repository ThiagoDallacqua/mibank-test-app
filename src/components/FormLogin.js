import React, { Component } from 'react'
// import axios from 'axios'

export default class FormLogin extends Component{
  constructor() {
    super();

    this.state = {

    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault();

    let data = {
      grant_type: 'password',
      username: e.target.usuario.value,
      password: e.target.senha.value,
      scope: 'offline_access'
    }



    fetch('https://mibankws.azurewebsites.net/connect/token', {
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }),
      method: 'post',
      body: JSON.stringify(data),
    }).then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))

    // axios({
    //   method: 'post',
    //   url: 'http://mibankws.azurewebsites.net/connect/token',
    //   data: data
    // })

    // axios.post('http://mibankws.azurewebsites.net/connect/token', {
    //   data
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>
            Usuário
            <input type="text" name="usuario" />
          </label>
          <label>
            Senha
            <input type="password" name="senha" />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
    )
  }
}
