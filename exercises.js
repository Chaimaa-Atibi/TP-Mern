const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const date = Date.parse(req.body.date);
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newExercise = new Exercise({
    username,
    gender,
    date,
    news,
    email,
    photo,
  });

  newExercise.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        const username = req.body.username;
        const gender = req.body.gender;
        const date = Date.parse(req.body.date);
        const news = req.body.news;
        const email = req.body.email;
        const photo = req.body.photo;
  
        exercise.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });