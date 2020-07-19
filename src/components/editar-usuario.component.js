import React, { Component } from 'react';
import axios from 'axios';


export default class EditarUsuario extends Component {
  constructor(props) {
  super(props);

  this.onChangeUsername = this.onChangeUsername.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  this.state = {
    username: '',
  }
}

componentDidMount() {
  axios.get('http://localhost:5000/users/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        username: response.data.username
      })
    })
    .catch(function (error) {
      console.log(error);
    })

}

onChangeUsername(e) {
  this.setState({
    username: e.target.value
  })
}


onSubmit(e) {
  e.preventDefault();

  const user = {
    username: this.state.username,
  }
  console.log(user);

  axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
    .then(res => console.log(res.data));

  window.location = '/user/list';
}
  render() {
    return(
      <div>
      <h3>Editar Usuario</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
          required
          className="form-control"
          value={this.state.username}
          onChange={this.onChangeUsername} />
        </div>
        <div className="form-group">
          <input type="submit" value="Editar" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
