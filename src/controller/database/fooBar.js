const { Foo, Bar } = require("../../../models");

//Foo adalah parent
//Bar adalah children

exports.getFoos = async (req, res) => {
  try {
    const foos = await Foo.findAll({
      include: {
        model: Bar,
      },
    });

    res.send({
      message: "Response Success",
      data: {
        foos,
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

exports.getBars = async (req, res) => {
  try {
    const bars = await Bar.findAll({
      include: {
        model: Foo,
        as: "parent",
      },
    });

    res.send({
      message: "Response Success",
      data: {
        bars,
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
