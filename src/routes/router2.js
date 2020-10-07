const express = require("express");

const router = express.Router();

const {
  read: getTodos,
  create: storeTodo,
  delete: deleteTodo,
  readOne: detailTodo,
} = require("../controller/database/todo");

const {
  readProfile,
  readUser,
  getUserJobs,
} = require("../controller/database/userProfile");

const {
  getBooksAuthors,
  getAuthorsBooks,
} = require("../controller/database/bookAuthor");

router.get("/todos", getTodos);
router.get("/todo/:id", detailTodo);
router.post("/todo", storeTodo);
router.delete("/todo/:id", deleteTodo);

router.get("/users", readUser);
router.get("/profiles", readProfile);
router.get("/user-jobs", getUserJobs);

router.get("/books-authors", getBooksAuthors);
router.get("/authors-books", getAuthorsBooks);

module.exports = router;
