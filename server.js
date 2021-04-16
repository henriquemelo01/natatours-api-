const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Configurando as variaveis de Ambiente
dotenv.config({ path: './config.env' });

// Conectando ao DB do Mongo (Cloud)
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

// START SERVER
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server started to listen requests on port ${port}`);
});
