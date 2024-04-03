const express = require("express");
const routerBook = express.Router();
const bookController = require("../controllers/book.controller");
// adđ author
routerBook.post("/", bookController.addBook);
// get all
routerBook.get("/", bookController.getAllBook);
// get a book by id
routerBook.get("/:id", bookController.getABook);
// update book by id
routerBook.put("/:id", bookController.updateBook);
// delete book by id
routerBook.delete("/:id", bookController.deleteBook);

module.exports = routerBook;
