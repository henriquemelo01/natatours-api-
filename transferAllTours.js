const fs = require('fs');
const Tour = require('./models/tourModel');

const tours = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  'utf8'
);
// console.log(tours);
console.log('------------------ Banco de Dados ------------------');

const deleteAllTours = async function () {
  try {
    await Tour.deleteMany();
    const toursData = await Tour.find();
    console.log(toursData);
  } catch {
    console.log(err);
  }
};

const getAllTours = async function () {
  try {
    const toursData = await Tour.find();
    console.log(toursData);
  } catch (err) {
    console.error(err);
  }
};

const insertNewTours = function() {
    await Tour.create({tours});
}

getAllTours();
