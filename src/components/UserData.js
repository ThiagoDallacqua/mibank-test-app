import React, { Component } from 'react'

export default class ClientData extends Component{

  render(){
    return (
      this.props.haveData
        ? <div>
            <p>saldo disponivel: {this.props.userData.saldo_disponivel}</p>
            <p>saldo disponivel TED: {this.props.userData.saldo_disponivel_ted}</p>
            <p>saldo bloqueado TED: {this.props.userData.saldo_bloqueado_ted}</p>
            <p>boletos abertos: {this.props.userData.boletos_abertos}</p>
            <p>valor boletos abertos: {this.props.userData.valor_boletos_abertos}</p>
            <p>fornecedores: {this.props.userData.fornecedores}</p>
            <p>clientes: {this.props.userData.clientes}</p>
            <p>saldo btc: {this.props.userData.saldo_btc}</p>
            <p>saldo cartao: {this.props.userData.saldo_cartao}</p>
            <p>consulta cartao: {this.props.userData.consulta_cartao}</p>
          </div>
        : null
    )
  }
}
