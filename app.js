const express = require('express');
const morgan = require('morgan');

// IMPORTING ROUTERS
const toursRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES Globais

app.use(express.json()); // nos possibillita ter acesso ao body da request
app.use((req, res, next) => {
  console.log('Hello from the middleware ');
  next();
});

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});

// Middleware só é "disparado" quando estamos no ambiente de desenvolvimento

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // log information about request
}

app.use(express.static(`${__dirname}/public`)); // Servindo arquivos estaticos para rota, permite acessar /overview.html

// ROUTES (Mounting)

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
