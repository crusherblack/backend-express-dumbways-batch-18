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

const { getBars, getFoos } = require("../controller/database/fooBar");

router.get("/todos", getTodos);
router.get("/todo/:id", detailTodo);
router.post("/todo", storeTodo);
router.delete("/todo/:id", deleteTodo);

//hasOne & belongsTo
/* router.get("/users", readUser);
router.get("/profiles", readProfile); */

router.get("/foos", getFoos); //get Parent dengan children || HasOne
router.get("/bars", getBars); //get Children dengan parent || BelongsTo

//hasMany
router.get("/user-jobs", getUserJobs);

//manyToMany
router.get("/books-authors", getBooksAuthors);
router.get("/authors-books", getAuthorsBooks);

module.exports = router;
