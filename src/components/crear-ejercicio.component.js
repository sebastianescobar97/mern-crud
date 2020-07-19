import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CrearEjercicio extends Component {
  constructor(props) {
    super(props);

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangeDescription = this._onChangeDescription.bind(this);
    this._onChangeDuration = this._onChangeDuration.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

// Ciclo de vida React componentDidMount

componentDidMount() {
  axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

}

// Funciones para rescatar los valores del formulario


  _onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  _onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  _onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  _onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  _onSubmit(e) {
    e.preventDefault();

    const ejercicio = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }
    console.log(ejercicio);

    axios.post('http://localhost:5000/ejercicio/add', ejercicio)
     .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return(
      <div>
      <h3>Crear Nuevo Ejercicio</h3>
      <form onSubmit={this._onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this._onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Descripción: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this._onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duración (en minutos): </label>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this._onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Fecha: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this._onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Crear ejercicio" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
