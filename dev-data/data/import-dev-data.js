const fs = require('fs');
const Tour = require('../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Conecting to Database

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connectionObj) => console.log('DB connection successful!'))
  .catch((err) => console.error(err));

// Read File

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// console.log('------------------ Banco de Dados ------------------');

const deleteData = async function () {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
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

const insertTours = async function () {
  try {
    await Tour.create(tours);
    console.log('Data was imported with sucessfull');
  } catch (err) {
    console.error(err);
  }
};

// getAllTours();

// Ao executar o comando node .\dev-data\data\import-dev-data.js --import o retorno sera:

console.log(process.argv);

/*[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\JavaScript\\Node.js - Course\\Material Didatico\\4-natours\\starter\\dev-data\\data\\import-dev-data.js',
    '--import'
  ]
  
*/

if (process.argv[2] === '--import') {
  insertTours();
} else if (process.argv === '--delete') {
  deleteData();
}

// deleteData();
insertTours();
