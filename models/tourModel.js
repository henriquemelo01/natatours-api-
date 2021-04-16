const mongoose = require('mongoose');

// Creating Mongoose Schema: Como os dados estarão estruturados, para descrever nossos dados, criar validadações
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
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
