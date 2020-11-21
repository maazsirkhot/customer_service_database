const bcrypt = require('bcrypt-nodejs');

const crypt = {};
const saltRounds = 10;

crypt.createHash = (data, successCallback, failureCallback) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      failureCallback(err);
      return;
    }
    bcrypt.hash(data, salt, null, (error, hash) => {
      if (error) {
        failureCallback(err);
        return;
      }
      successCallback(hash);
    });
  });
};

crypt.compareHash = (data, encrypted, successCallback, failureCallback) => {
  bcrypt.compare(data, encrypted, (err, check) => {
    if (err) {
      failureCallback(err);
      return;
    }
    successCallback(err, check);
  });
};

module.exports = crypt;
