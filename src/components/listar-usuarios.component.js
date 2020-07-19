import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const User = props => (
  <tr>
  <th>{props.users.username}</th>
  <th className="text-center">
  <Link className="btn btn-primary" to={"/user/edit/"+props.users._id}>Editar</Link> | <a className="btn btn-danger" href="#" onClick={() => { props.borrarUsuario(props.users._id) }}>Borrar</a>
  </th>
  </tr>
)

export default class ListarUsuarios extends Component {

  constructor(props) {
    super(props);

    this.borrarUsuario = this.borrarUsuario.bind(this);

    this.state = { users: [] };
  }

  componentDidMount () {
    axios.get('http://localhost:5000/users/')
     .then(response => {
       this.setState({ users: response.data })
     })
     .catch((error) => {
       console.log(error);
     })
  }

  borrarUsuario(id) {
    axios.delete('http://localhost:5000/users/'+id)
     .then(res => console.log(res.data));
     this.setState({
       users: this.state.users.filter(el => el._id !== id)
     })
  }

  listarUsuario() {
    return this.state.users.map(current => {
      return <User users={current} borrarUsuario={this.borrarUsuario}
      key={current._id} />;
    })
  }


  render() {
    return(
      <div>
        <h3>Lista de Usuarios</h3>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col" className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            { this.listarUsuario() }
          </tbody>
        </table>
      </div>
    )
  }
}
