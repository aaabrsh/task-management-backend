module.exports.validateEmail = (value) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;

  return value.match(validRegex) ? true : false;
};

module.exports.validateUsername = (value) => {
  return value[0] === "@" && value.length > 1 ? true : false;
};

module.exports.getValidationMessages = (error) => {
  error.message = {};
  const keys = Object.keys(error.errors);

  keys.forEach((key) => {
    error.message[key] = error.errors[key].message;
  });

  error.statusCode = 400;
  return error;
};
