const router = require('express').Router();
let Ejercicio = require ('../models/ejercicio.model');

router.route('/').get((req, res) => {
  Ejercicio.find()
  .then(ejercicio => res.json(ejercicio))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Agregar ejercicio

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newEjercicio = new Ejercicio({
    username,
    description,
    duration,
    date,
  });

  newEjercicio.save()
  .then (() => res.json('Ejercicio Agregado!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener Ejercicios

router.route('/:id').get((req, res) => {
  Ejercicio.findById(req.params.id)
  .then(ejercicio => res.json(ejercicio))
  .catch(err => res.status(400).json('Error: ' + err ));
});

// Eliminar Ejercicio

router.route('/:id').delete((req, res) => {
  Ejercicio.findByIdAndDelete(req.params.id)
  .then(() => res.json('Ejercicio Eliminado'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Update Ejercicios

router.route('/update/:id').post((req, res) => {
  Ejercicio.findById(req.params.id)
  .then(ejercicio => {
    ejercicio.username = req.body.username;
    ejercicio.description = req.body.description;
    ejercicio.duration = Number(req.body.duration);
    ejercicio.date = Date.parse(req.body.date);

    ejercicio.save()
    .then ( () => res.json('Ejercicio Actualizado !'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
});


module.exports = router;
