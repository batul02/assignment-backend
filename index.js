const express = require('express');
const app = express();
const csv = require('csvtojson')
let lodash = require("lodash");

var authors = [];
csv().fromFile("./data/authors.csv")
.then((data)=>{
    authors = data;
})

// Print out all books and magazines (on either console UI) with all their details (with a meaningful output format).
var books = [];
csv().fromFile("./data/books.csv")
    .then((data)=>{
    books = data;
    console.log("Books : ")
    books.forEach((data) => {
        console.log(data);
    })
})

var magazines = [];
csv().fromFile("./data/magazines.csv")
.then((data)=>{
    magazines = data;
    console.log("Magazines : ")
    magazines.forEach((item) => {
        console.log(item);
    })
})

app.use(express.json())

// Find a book or magazine by its ISBN.

app.get('/find/:isbn', async (request, response) => {
    var isbn = request.params.isbn;

    csv().fromFile("./data/magazines.csv").fromFile("./data/books.csv")
    .then((data)=>{
        var mag = data.filter(data => data.isbn == isbn)
        response.send(mag);
    });
    
})

// Find all books and magazines by their authors’ email.

app.get('/findemail/:email', async (request, response) => {
    var email = request.params.email;

    csv().fromFile("./data/magazines.csv").fromFile("./data/books.csv")
    .then((data)=>{
        var mag = data.filter(data => data.authors == email)
        response.send(mag);
    });
})

// Print out all books and magazines with all their details sorted by title. This sort should be done for books and magazines together.

app.get('/sortbytitle', async (request, response) => {

    csv().fromFile("./data/magazines.csv").fromFile("./data/books.csv")
    .then((data)=>{
        var mag = lodash.sortBy(data, (e) => {return e.title})
        response.send(mag);
    });
    
})

const PORT = 4000;
app.listen(PORT);

module.exports = app
