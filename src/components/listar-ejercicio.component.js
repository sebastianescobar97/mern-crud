import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Ejercicio = props => (
  <tr>
  <th>{props.ejercicio.username}</th>
  <th>{props.ejercicio.description}</th>
  <th>{props.ejercicio.duration} (Min)</th>
  <th>{props.ejercicio.date.substring(0,10)}</th>
  <th>
  <Link className="btn btn-primary" to={"/edit/"+props.ejercicio._id}>Editar</Link> | <a className="btn btn-danger" href="#" onClick={() => { props.borrarEjercicio(props.ejercicio._id) }}>Borrar</a>
  </th>
  </tr>
)

export default class ListarEjercicio extends Component {

  constructor(props) {
    super(props);

    this.borrarEjercicio = this.borrarEjercicio.bind(this);

    this.state = { ejercicio: [] };
  }

  componentDidMount () {
    axios.get('http://localhost:5000/ejercicio/')
     .then(response => {
       this.setState({ ejercicio: response.data })
     })
     .catch((error) => {
       console.log(error);
     })
  }

  borrarEjercicio(id) {
    axios.delete('http://localhost:5000/ejercicio/'+id)
     .then(res => console.log(res.data));
     this.setState({
       ejercicio: this.state.ejercicio.filter(el => el._id !== id)
     })
  }

  listaEjercicios() {
    return this.state.ejercicio.map(current => {
      return <Ejercicio ejercicio={current} borrarEjercicio={this.borrarEjercicio}
      key={current._id} />;
    })
  }


  render() {
    return(
      <div>
        <h3>Ejercicios</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Descripción</th>
              <th scope="col">Duración</th>
              <th scope="col">Fecha</th>
              <th scope="col"s>Acción</th>
            </tr>
          </thead>
          <tbody>
            { this.listaEjercicios() }
          </tbody>
        </table>
      </div>
    )
  }
}
