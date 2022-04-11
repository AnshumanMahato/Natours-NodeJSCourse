const Tour = require('./../models/tourModel');

exports.checkTourData = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Bad Request',
      message: 'no name or price property provided'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  // const tour = tours.find(el => el.id === +req.params.id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.addTour = (req, res) => {
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     ...newTour
  //   }
  // });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success'
    // data: {
    //   tour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success'
    // data: {
    //   to
    // },
  });
};
