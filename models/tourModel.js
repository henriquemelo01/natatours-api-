const mongoose = require('mongoose');

// Creating Mongoose Schema: Como os dados estarão estruturados, para descrever nossos dados, criar validadações
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true, // - remove todos os espaços em brancos no inicio e no fim
  },
  duration: {
    // Validators
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, // Só funciona p/ string - remove todos os espaços em brancos no inicio e no fim
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    // String referencia à imagem
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    // Armazena a Data de criação de um tour pelo usuario
    type: Date,
    default: Date.now(),
  },
  startDates: [Date], // Um tour pode conter diferentes datas
});

// Criando um modelo que segue o Schema
const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;

// Instanciando um objeto (document) que segue o modelo tour que segue as "regras" definidas no Schema
// const testeTour = new Tour({
//   name: 'Test Tour',
//   rating: 4.6,
//   price: 550,
// });

// Salvando um Document no nosso banco de dados
// testeTour
//   .save()
//   .then((newObj) => console.log(newObj))
//   .catch((err) => consol.error(`🚨🚨 ERROR : ${err.message}`));
