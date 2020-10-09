const isLoggedIn = false;

exports.auth = (req, res, next) => {
  if (isLoggedIn) next();
  else
    res.status(403).send({
      message: "You are unauthenticated!",
    });
};
