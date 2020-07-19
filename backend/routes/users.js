const router = require('express').Router();
let User = require ('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Agregar Usuario

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
  .then (() => res.json('Usuario Agregado'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener Usuario por id

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Eliminar Usuario

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then (() => res.json('Usuario Eliminado !!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Update Usuario

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
  .then(users => {
    users.username = req.body.username;

    users.save()
    .then(() => res.json('Usuario Actualizado !!'))
    .catch (err => res(400).json('Error: ' + err));
  });
});

module.exports = router;
