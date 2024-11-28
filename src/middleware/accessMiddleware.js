const access = (...allowed) => {
  return (req, res, next) => {
    if (!allowed.includes(req.user.role))
      // check for role in allowed roles..
      res.status(404).json("Access denied...");
    next();
  };
};

module.exports = access;
