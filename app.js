const express = require('express');
const morgan = require('morgan');

// IMPORTING ROUTERS
const toursRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware ');
  next();
});

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});

app.use(morgan('dev')); // log information about request

// ROUTES (Mounting)

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
