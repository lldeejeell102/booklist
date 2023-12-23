////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

const app = express();
const { PORT = 3013 } = process.env;
// const PORT = process.env.PORT || 3013;

// bring in our model
const Book = require("./models/Book.js")
////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////////////////////////////////////////////////////////
app.use(morgan("dev")) // brings morgan in
app.use(express.urlencoded({ extended: false })) // body parser (how we get acess to req.body)

// lets us use DELETE PUT http verbs
app.use(methodOverride("_method"))

////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////////////////
// Index - GET (render all of the books)
app.get("/books", async (req, res) => {
    // find all of the books
    let books = await Book.find({})
    //render all the books => index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})


// New - GET (form to create a new book)
app.get("/books/new", (req, res) => {
    res.render("new.ejs")
})

// Delete - DELETE
app.delete("/books/:id", async (req, res) => {
    try {
        // Find a book and then delete
        let deletedBook = await Book.findByIdAndDelete(req.params.id)
        console.log(deletedBook)
        // redirect back to the index
        res.redirect("/books")
    } catch (error){
        res.status(500).send("somethign went wrong when deleting")
    }
})


// Create - POST
app.post("/books", async (req, res) => {
    try{
        if (req.body.completed === "on") {
            // if it's checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
        }

        let newBook = await Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
})

// Edit
app.get("/books/edit/:id", async (req, res) => {
    try {
        // find the book and edit
        let foundBook = await Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })

    } catch (error) {
        res.send(error)
    }
})

// Show - GET (rendering only one book)
app.get("/books/:id", async (req, res) => {
    // find a book by _id
    let foundBook = await Book.findById(req.params.id) // the request params id
    // render show.ejs with the found book
    res.render("show.ejs", {
        book: foundBook
    })
})


////////////////////////////////////////////////////////////////////////////////////////////
// LISTENER
////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`server is listenting on port: ${PORT}`))