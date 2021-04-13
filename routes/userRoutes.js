const express = require('express');

//Importando controllers
const {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();
router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
