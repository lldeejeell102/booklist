////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const bookRouter = require("./routes/books.js")

const app = express();
const { PORT = 3013 } = process.env;
const seedData = require("./models/seed.js")
// const PORT = process.env.PORT || 3013;

// bring in our model
const Book = require("./models/Book.js")
////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////////////////////////////////////////////////////////
// adds in Book and seedData into all code below
app.use((req, res, next) => {
    req.model = {
        Book,
        seedData
    }
    // go to the next app method
    next()
})


app.use(morgan("dev")) // brings morgan in
app.use(express.urlencoded({ extended: false })) // body parser (how we get acess to req.body)
app.use("/public", express.static("public")) // serve up our public directory

// lets us use DELETE PUT http verbs
app.use(methodOverride("_method"))

////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////////////////
// app.use(prefix url, router to execute)
app.use("/books", bookRouter)


////////////////////////////////////////////////////////////////////////////////////////////
// LISTENER
////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`server is listenting on port: ${PORT}`))