module.exports = (error, _, res, _) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (error.name) {
    case "Email Empty":
      status = 400;
      message = "Do not empty your email!";
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
