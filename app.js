
//module import
const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Route Handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const addTour = (req, res) => {
  const id = tours.length;

  const newTour = {
    id,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return res.status(500).send('Error Occured');

      res.status(201).json({
        status: 'success',
        data: {
          ...newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // const tour = tours.index();

  // if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

const deleteTour = (req, res) => {
  // const tour = tours.index();

  // if (!tour) return res.status(404).send('No tours found');

  res.status(200).json({
    status: 'success',
    // data: {
    //   to
    // },
  });
};

//Route handling with individual route methods

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Route handling with route method
//Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(addTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


//Server initiation
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
