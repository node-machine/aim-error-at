/**
 * aimErrorAt()
 *
 * Build or modify an Error so that it is aimed towards the specified exit.
 * (useful in synchronous machines, big switch statements, and loops inside of try/catch blocks)
 *
 * Specifically, this:
 * • Builds and returns an Error instance from the specified error message, setting its `exit` to the provided exitCodeName.
 * • Or, if an Error was provided instead, modifies its `exit` property to the provided exitCodeName and returns that.
 *
 * @required  {String} exitCodeName
 * @optional  {===} errMsgOrError
 *
 * @returns {Error}
 */
module.exports = function aimErrorAt (exitCodeName, errMsgOrError){
  if (!exitCodeName) {
    throw new Error('Usage error: Unexpected `exitCodeName` provided to `aimErrorAt()`: '+exitCodeName);
  }

  // If an error instance was provided (i.e. for better stack trace),
  // then just modify its `exit` property.
  if (typeof errMsgOrError === 'object' && errMsgOrError !== null && errMsgOrError.constructor && errMsgOrError.constructor.name === 'Error') {
    errMsgOrError.exit = exitCodeName;
    return errMsgOrError;
  }
  // Otherwise if it is an error message, instantiate a new error.
  else if (typeof errMsgOrError === 'string') {
    var err = new Error(errMsgOrError);
    err.exit = exitCodeName;
    return err;
  }
  // If no Error or error message was provided, build a default error and throw that.
  else if (typeof errMsgOrError === 'undefined') {
    var defaultErr = new Error();
    defaultErr.exit = exitCodeName;
    return defaultErr;
  }
  else {
    throw new Error('Usage error: Unexpected error message or Error instance provided to `aimErrorAt` helper: '+errMsgOrError);
  }
};
