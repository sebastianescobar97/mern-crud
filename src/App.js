import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ListarEjercicio from "./components/listar-ejercicio.component";
import EditarEjercicio from "./components/editar-ejercicio.component";
import CrearEjercicio from "./components/crear-ejercicio.component";
import CrearUser from "./components/crear-user.component";
import ListarUsuarios from "./components/listar-usuarios.component";
import EditarUsuario from "./components/editar-usuario.component";


function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component={ListarEjercicio} />
      <Route path="/edit/:id" exact component={EditarEjercicio} />
      <Route path="/create" exact component={CrearEjercicio} />
      <Route path="/user/create" exact component={CrearUser} />
      <Route path="/user/list" exact component={ListarUsuarios} />
      <Route path="/user/edit/:id" exact component={EditarUsuario} />
    </div>
    </Router>
  );
}

export default App;
