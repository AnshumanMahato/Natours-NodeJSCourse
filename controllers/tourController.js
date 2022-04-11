const Tour = require('./../models/tourModel');

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

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        ...newTour._doc
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
