import React, { Component } from 'react'
import $ from 'jquery'
import ClientData from './UserData.js'
import ErrorComponent from './ErrorComponent.js'
// import axios from 'axios'

export default class FormLogin extends Component{
  constructor() {
    super();

    this.state = {
      haveData: false,
      userData: {},
      errorType: '',
      errorMessage: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();

    let data = {
      grant_type: 'password',
      username: e.target.usuario.value,
      password: e.target.senha.value,
      scope: 'offline_access'
    }

    // fetch('http://mibankws.azurewebsites.net/connect/token', {
    //   headers: new Headers({
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'Cache-control': 'no-cache'
    //   }),
    //   method: 'post',
    //   mode: 'cors',
    //   body: JSON.stringify(data),
    // }).then(res => {
    //   console.log(res);
    // })
    // .catch(err => console.log(err));

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://mibankws.azurewebsites.net/connect/token",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache"
      },
      "data": data
    }

    $.ajax(settings)
      .done(response => {
        let settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://mibankws.azurewebsites.net/api/dashboard/dashboard",
          "method": "GET",
          "headers": {
            "authorization": `Bearer ${response.access_token}`,
            "cache-control": "no-cache"
          }
        }

        $.ajax(settings).done(response => {
          console.log(response);
          this.setState({haveData: true});
          this.setState({userData: response});
        });
      })
      .fail(err => {
        this.setState({haveData: false})
        this.setState({
          errorType: err.responseJSON.error,
          errorMessage: err.responseJSON.error_description
        })
      });
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
        <ErrorComponent errorType={this.state.errorType} errorMessage={this.state.errorMessage} />
        { this.state.haveData
          ? <div>
              <p>saldo disponivel: {this.state.userData.saldo_disponivel}</p>
              <p>saldo disponivel TED: {this.state.userData.saldo_disponivel_ted}</p>
              <p>saldo bloqueado TED: {this.state.userData.saldo_bloqueado_ted}</p>
              <p>boletos abertos: {this.state.userData.boletos_abertos}</p>
              <p>valor boletos abertos: {this.state.userData.valor_boletos_abertos}</p>
              <p>fornecedores: {this.state.userData.fornecedores}</p>
              <p>clientes: {this.state.userData.clientes}</p>
              <p>saldo btc: {this.state.userData.saldo_btc}</p>
              <p>saldo cartao: {this.state.userData.saldo_cartao}</p>
              <p>consulta cartao: {this.state.userData.consulta_cartao}</p>
            </div>
          : null }
      </div>
    )
  }
}
