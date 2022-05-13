//module import
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userrRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

//Route Handlers

//Route handling with individual route methods

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Route handling with route method
//Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find route ${req.originalUrl}`
  // });
  // const err = new Error(`Can't find route ${req.originalUrl}`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find route ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
