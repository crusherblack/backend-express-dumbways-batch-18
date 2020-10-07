const { Book, Author, AuthorBook } = require("../../../models");

exports.getBooksAuthors = async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: {
        model: Author,
        as: "authors",
        through: {
          model: AuthorBook,
          as: "info",
        },
      },
    });

    res.send({
      message: "Success",
      data: {
        book: bookData,
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

exports.getAuthorsBooks = async (req, res) => {
  try {
    const AuthorsData = await Author.findAll({
      include: {
        model: Book,
        as: "books",
        through: {
          model: AuthorBook,
          as: "info",
        },
      },
    });

    res.send({
      message: "Response Success",
      data: {
        authors: AuthorsData,
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
