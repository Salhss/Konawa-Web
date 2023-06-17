module.exports = (error, _, res, __) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (error.name) {
    case "Email Empty":
      status = 400;
      message = "email must be required";
      break;

    case "Password Empty":
      status = 400;
      message = "password must be required";
      break;

    case "Email Not Unique":
      status = 400;
      message = "Email have beed registered, create a new one!";
      break;

    case "Email Not Match":
      status = 400;
      message = "Email not registered, try to sign up first";
      break;

    case "Password Not Match":
      status = 400;
      message = "password didn't match";
      break;

    case "InvalidToken":
      status = 401;
      message = "You're not auntheticated!";
      break;

    case "Forbidden":
      status = 403;
      message = "You're not authorizated!";
      break;

    case "NotFound":
      status = 404;
      message = "Data Not Found!";
      break;

    default:
      break;
  }
  res.status(status).json({ message: message });
};
