const { Author } = require("../models/author.model");
const { Book } = require("../models/book.model");

module.exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saveBook = await newBook.save();
    if (req.body.author) {
      const author = Author.findById(req.body.author);
      await author.updateOne({ $push: { books: saveBook._id } });
    }
    res.status(200).json({ message: "Successfully!", saveBook });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Successfully!", books });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getABook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    res.status(200).json({ message: "Successfully!", book });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    await book.updateOne({ $set: req.body });
    res.status(200).json({ message: "Successfully!", book });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    await Author.updateMany(
      { books: req.params.id },
      { $pull: { books: req.params.id } }
    );
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully!", book });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};
