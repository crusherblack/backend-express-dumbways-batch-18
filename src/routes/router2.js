const express = require("express");

const router = express.Router();

const { auth: authDummy } = require("../middleware/dummyAuth");
const { authenticated } = require("../middleware/authentication");

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

const { register, login } = require("../controller/database/auth");

router.get("/todos", authenticated, getTodos);
router.get("/todo/:id", authenticated, detailTodo);
router.post("/todo", authenticated, storeTodo);
router.delete("/todo/:id", authenticated, deleteTodo);

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

//auth login & register
router.post("/register", register);
router.post("/login", login);

module.exports = router;
