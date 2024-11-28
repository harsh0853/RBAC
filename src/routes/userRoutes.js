const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const accessMiddleware = require("../middleware/accessMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const Router = express.Router();

// Access control based on roles
Router.get("/admin", verifyToken, accessMiddleware("admin"), (req, res) => {
  res.json("Welcome Admin");
});

Router.get(
  "/teacher",
  verifyToken,
  accessMiddleware("teacher", "admin"),
  (req, res) => {
    res.json("Welcome Teacher");
  }
);

Router.get(
  "/student",
  verifyToken,
  accessMiddleware("student", "teacher", "admin"),
  (req, res) => {
    res.json("Welcome Student");
  }
);

// Permission-based actions
Router.get(
  "/canSeeResults",
  verifyToken,
  permissionMiddleware("check"),
  (req, res) => {
    res.json("Result of a particular student...");
  }
);

Router.put(
  "/canEditResults",
  verifyToken,
  permissionMiddleware("edit"),
  (req, res) => {
    res.json("Edit result of a particular student...");
  }
);

Router.delete(
  "/canRemoveStudentInfoFromDatabase",
  verifyToken,
  permissionMiddleware("remove"),
  (req, res) => {
    res.json("Student removed...");
  }
);

Router.post(
  "/canAddNewStudentInfoToDatabase",
  verifyToken,
  permissionMiddleware("add"),
  (req, res) => {
    res.json("New student added...");
  }
);

module.exports = Router;
