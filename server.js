//import express module
const express = require("express");

const bodyParser = require("body-parser");

require("express-group-routes");

//use express in app variable
const app = express();

app.use(bodyParser.json());

//define the server port
const port = 5000;

//>>>>>>>>>>>>>>>>>>>>>>>>> CRUD START <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let todos = [
  {
    id: 1,
    title: "Cuci tangan",
    isDone: true,
  },
  {
    id: 2,
    title: "Belajar node js",
    isDone: false,
  },
];

app.get("/todos", (req, res) => {
  res.send({ data: { todos } });
});

app.get("/todo/:id", (req, res) => {
  const filteredTodo = todos.filter((todo) => todo.id == req.params.id);
  res.send(filteredTodo[0]);
});

app.post("/todo", (req, res) => {
  todos = [...todos, req.body];
  res.send({ data: todos });
});

app.patch("/todo/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updatedTodo = todos.map((todo) =>
    todo.id == id
      ? {
          ...todo,
          title: body.title,
          isDone: body.isDone,
        }
      : todo
  );
  todos = updatedTodo;
  res.send({ data: todos });
});

app.put("/todo-put/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updatedTodo = todos.map((todo) => (todo.id == id ? body : todo));
  todos = updatedTodo;
  res.send({ data: todos });
});

app.delete("/todo/:id", (request, response) => {
  const { id } = request.params;
  todos = todos.filter((todo) => todo.id != id);
  response.send({ data: todos });
});

//>>>>>>>>>>>>>>>>>>>>>>>>> CRUD END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/* app.get("/api/v1/todos", (req, res) => {
  res.send({ data: { todos } });
}); */

app.group("/api/v1", (router) => {
  router.get("/todos", (req, res) => {
    res.send({ data: { todos } });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
