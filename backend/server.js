// se importan las librerias
const express = require ('express');
const cors = require ('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexion mongoDB

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

// se llama a las rutas - routes

const ejericioRouter = require('./routes/ejercicios');
const usersRouter = require('./routes/users');

app.use('/ejercicio', ejericioRouter);
app.use('/users', usersRouter);

connection.once('open', () => {
  console.log("Conexion con MongoDB Establecida correctamente");
});

app.listen(port, () => {
      console.log(`El servidor se esta ejecutando en el puerto: ${port}`);
});
