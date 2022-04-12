const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) throw new Error('No tours found with the given id.');
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message
    });
  }
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
