const fs = require('fs');
const Tour = require('../models/tourModel'); // importando o modelo

// Data
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS (Controlers)

// Middleware param controller
exports.checkId = (req, res, next, value) => {
  if (value > toursData.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Page not Found',
    });
  }

  next();
};

exports.checkNewTourData = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    // status = 400 -> bad request
    return res.status(400).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Query MongoDB -> db.tours.find()
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    //MongoDB query -> db.tours.find({_id: idNumber}) || Tour.findOne({ _id: req.params.id})
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'sucess',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createNewTour = async (req, res) => {
  try {
    // Creating new Tour
    const newTour = await Tour.create(req.body);

    // 201 === Created
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // 400 === Bad request
    res.status(400).json({
      status: 'fail',
      message: 'Failed to create a new Tour',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    // Identificar qual Tour Desejamos modificar por meio do ID
    await Tour.findByIdAndUpdate(req.params.id, req.body); // retorna o document antigo (antes da modificação)

    const updatedTour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'sucess',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = (req, res) => {
  3;
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
