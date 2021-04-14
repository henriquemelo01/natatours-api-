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
  checkId,
  checkNewTourData,
} = require('../controllers/tourController');

const router = express.Router();

// Middleware que é executado para um determinado parâmetro. Utiliza-se este tipo de Middleware quando temos uma repetição de código nos metodos http que são associados a rota que contém o id. Ex: Código que verifica se o id é valido
router.param('id', checkId);

router.route('/').get(getAllTours).post(checkNewTourData, createNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
