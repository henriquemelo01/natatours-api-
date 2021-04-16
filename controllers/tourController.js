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

exports.getAllTours = (req, res) => {
  // res.json é um middleware que finaliza the request-response cycle - não chama a função next
  res.status(200).json({
    // JSend format
    status: 'sucess',
    results: toursData.length,
    requestAt: req.currentTime,
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
  // Acessando os parametros da URL
  // console.log(req.params); // retorna um objeto contendo todos os parametros da url: {id: numParametro}

  const id = Number(req.params.id);
  const tour = toursData.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'sucess',
    data: {
      tour: tour,
    },
  });
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
