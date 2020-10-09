const { todo } = require("../../../models");

exports.read = async (req, res) => {
  console.log("INI ADALAH ID USER YANG LOGIN", req.user);
  try {
    const todos = await todo.findAll();

    res.send({
      message: "Response Success",
      data: { todos },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;

    const detailTodo = await todo.findOne({
      where: {
        id,
      },
    });

    res.send({
      message: "Response Success",
      data: {
        todo: detailTodo,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.create = async (req, res) => {
  try {
    const todoCreated = await todo.create(req.body);

    res.send({
      message: "Todo has succesfully created",
      data: {
        todo: todoCreated,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    await todo.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: `Delete Success!!! Your todo with id: ${id} has been deleted`,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
