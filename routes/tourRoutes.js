// Importando Modulos
const express = require('express');

const app = express();

// Importando Controllers (Route Handlers)
const {
  getAllTours,
  getTour,
  createNewTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
