////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////
// no middleware
// const Book = require("../models/Book")
// then replace req.model. in front of Book to replace middleware

////////////////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    show,
    seed
}

////////////////////////////////////////////////////////////////////////////////////////////
// ROUTE CONTROLLERS -- Index New Destroy Update Create Edit Show (Seed)
////////////////////////////////////////////////////////////////////////////////////////////

async function index(req, res) {
    // find all of the books
    let books = await req.model.Book.find({})
    
    //render all the books => index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
}

async function newForm(req, res) {
    res.render("new.ejs")
}

async function destroy(req, res) {
    try {
        // Find a book and then delete
        let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
        console.log(deletedBook)
        // redirect back to the index
        res.redirect("/books")
    } catch (error){
        res.status(500).send("somethign went wrong when deleting")
    }
}

async function update(req, res) {
    try{
        // handle our checkbox
        if(req.body.completed === "on"){
            req.body.completed = true
        } else {
            req.body.completed = false
        }
        // then find by ID and update with req.body
        // findByIdAndUpdate - id, data to update, options
        let updatedBook = await req.model.Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        // redirect to the show route wih the updated book
        res.redirect(`/books/${updatedBook._id}`)
        }catch{
            res.send("something went wrong in update route")
        }
}

async function create(req, res) {
    try{
        if (req.body.completed === "on") {
            // if it's checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
        }

        let newBook = await req.model.Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
}

async function edit(req, res) {
    try {
        // find the book and edit
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })

    } catch (error) {
        res.send(error)
    }
}

async function seed(req, res) {
    try{
        // delete everything in the database
        await req.model.Book.deleteMany({})
        // create data in the database
        await req.model.Book.create(
            req.model.seedData
        )
        // redirect back to the index
        res.redirect("/books")
    } catch (error) {
        res.send("something went wrong with your seed")
    }
}

async function show(req, res) {
    // find a book by _id
    let foundBook = await req.model.Book.findById(req.params.id) // the request params id
    // render show.ejs with the found book
    res.render("show.ejs", {
        book: foundBook
    })
}