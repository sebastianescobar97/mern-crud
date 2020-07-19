import React , { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return(
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Mantenedor Ejercicios</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
       <li className="navbar-item">
       <Link to="/" className="nav-link">Ejercicios</Link>
       </li>
       <li className="navbar-item">
       <Link to="/create" className="nav-link">Crear Ejercicio</Link>
       </li>
       <li className="navbar-item">
       <Link to="/user/list" className="nav-link">Lista de Usuarios</Link>
       </li>
       <li className="navbar-item">
       <Link to="/user/create" className="nav-link">Crear Usuario</Link>
       </li>
       </ul>
       </div>
       </nav>
    )
  }
}
