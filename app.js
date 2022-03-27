//module import
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userrRoutes');

const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

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

//Server initiation
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
