const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Conectando ao DB do Atlas (Cloud)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// mongoose.connect retorna um promisse
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connectionObj) => console.log('DB connection successful!'))
  .catch((err) => console.error(err));

// Creating Mongoose Schema: Como os dados estarão estruturados, para descrever nossos dados, criar validadações

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // no blank, when the field was missed is the seccond parameter of array
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'], // validator
  },
});

// Model => we need to declare with Uppercase; Criando um modelo que segue o Schema
const Tour = mongoose.model('Tour', tourSchema); // cria uma collection - tours

// Instanciando um objeto (document) que segue o modelo tour que segue as "regras" definidas no Schema
const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 997,
});

// .save() -> Save to the tours collection on the Database -> return a promisse
// testTour
//   .save()
//   .then((document) => console.log(document))
//   .catch((err) => console.error('🧨ERROR: ', err.message));

// START SERVER
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server started to listen requests on port ${port}`);
});
