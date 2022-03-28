const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkid = (req, res, next, val) => {
  console.log(`id is ${val}`);
  const id = +req.params.id;
  if (id < 0 || id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkTourData = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Bad Request',
      message: 'no name or price property provided',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  const id = tours.length;

  const newTour = {
    id,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   to
    // },
  });
};
