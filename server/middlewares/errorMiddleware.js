import colors from "colors";
//error middleware || NEXT function

const errorMiddleware = (err, req, res, next) => {
  console.log(`${err}`.bgRed.white);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };

  //missing field error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //duplicate error
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(
      err.keyValue
    )} field value has to be unique`;
  }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;
