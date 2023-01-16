module.exports.validateEmail = (value) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;

  return value.match(validRegex) ? true : false;
};

module.exports.validatePassword = (value) => {
  return value.length >= 8 ? true : false;
};

module.exports.validateUsername = (value) => {
  return value[0] === "@" ? true : false;
};
