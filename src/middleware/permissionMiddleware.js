const permissions = {
  admin: ["edit", "remove", "add", "check"],
  teacher: ["edit", "check"],
  student: ["check"],
};

// Middleware to check permissions
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const { role } = req.user; // role is available from the JWT token
    if (permissions[role] && permissions[role].includes(requiredPermission)) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have permission." });
    }
  };
};

module.exports = checkPermission;
