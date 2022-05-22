const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  return new AppError(`Invalid value for ${err.path}:${err.value}`, 400);
};

const sendErrorDev = (err, res) => {
  //In dev environment all errors are important
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //in PRODUCTION only errors related to client operations need to be sent to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    //For other errors we just log the error and send a generic message
    console.error('ERROR 💥💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
};
