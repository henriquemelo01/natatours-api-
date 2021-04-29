const fs = require('fs');
const Tour = require('../models/tourModel'); // importando o modelo

// Data
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS (Controlers)

// Middleware param  - Controller
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

// Aplicando filtros por meio do tratamento da query string

exports.getAllTours = async (req, res) => {
  try {
    // Aplicando Filtros à API

    // Removendo campos que não estão presentes nos documents
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    const queryObj = { ...req.query };
    excludedFields.forEach((el) => delete queryObj[el]); // Removendo propriedades do Query ObJ

    // Filtros Avançados - uso de operadores (lt,lte, gt, gte)

    // filterObj = {difficulty: "easy", duration: { $lte: 5}} - MongoDB
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // Query MongoDB -> db.tours.find()
    const tours = await Tour.find(JSON.parse(queryString));
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
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // OBS: Se não adicionarmos o objeto de opções o valor preenchido na promise é o document antigo.
      runValidators: true, // if true, update validators validate the update operation against the model's schema.
    });

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

exports.deleteTour = async (req, res) => {
  try {
    const deletedData = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
