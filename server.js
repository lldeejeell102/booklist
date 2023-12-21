////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan")

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


////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////////////////
// Index - GET (render all of the books)

// New - GET (form to create a new book)
app.get("/books/new", (req, res) => {
    res.send("new book")
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
        res.send(newBook)
    } catch (err) {
        res.send(err)
    }
})

// Show - GET (rendering only one book)



////////////////////////////////////////////////////////////////////////////////////////////
// LISTENER
////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`server is listenting on port: ${PORT}`))