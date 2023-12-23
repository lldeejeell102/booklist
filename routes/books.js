////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////
const express = require("express")
const router = express.Router()

// bring in our controller
const bookController = require("../controllers/books.js")


////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES - INDUCESS (cmd + shift + L --- selects all the highlighted same word
////////////////////////////////////////////////////////////////////////////////////////////
// Index - GET (render all of the books)
router.get("/", bookController.index)


// New - GET (form to create a new book)
router.get("/new", bookController.newForm)


// Delete - DELETE
router.delete("/:id", bookController.destroy)


// Update
router.put("/:id", bookController.update)


// Create - POST
router.post("/", bookController.create)


// Edit
router.get("/edit/:id", bookController.edit)


// Seed
router.get("/seed", bookController.seed)


// Show - GET (rendering only one book)
router.get("/:id", bookController.show)


// Export our router
module.exports = router