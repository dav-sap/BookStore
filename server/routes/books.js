var express = require('express');
var router = express.Router();
const books = require('./../src/db/booksSchema.js');


router.post('/new_book', function (req, res, next) {
    if (req.body.title && req.body.isbn_number && req.body.price) {
        var newBook = {
            title: req.body.title,
            isbn_number: req.body.isbn_number,
            description: req.body.description ? req.body.description : "",
            author: req.body.author ? req.body.author : "",
            publication_date: req.body.publication_date ? new Date(req.body.publication_date) : undefined,
            genre: req.body.genre ? req.body.genre : "",
            price: req.body.price
        };
        books.create(newBook, function (err, newBook) {
            if (err) {
                console.error(err);
                res.status(500).send("error creating new book in DB")
            } else {
                res.send("Book Created!");
            }
        })
    } else {
        res.status(400).send("Wrong parameters sent")
    }
});
router.post('/remove_book', function (req, res, next) {
    if (req.body.isbn_number) {
        books.findOneAndRemove({isbn_number : req.body.isbn_number}, function (err, book) {
            if (err) {
                console.error(err);
                res.status(500).send("error removing book in DB")
            } else {
                if (book) {
                    res.send("Book " + book.title + " Removed")
                } else {
                    res.status(400).send("No Book found for id: " + req.body.isbn_number)
                }
            }
        })
    } else {
        res.status(400).send("Wrong parameters sent")
    }
});
/* GET book by params. */
router.get('/get_book', function(req, res, next) {
    let isbnNumber = req.query.isbnNumber;
    if (isbnNumber) {
        books.findOne({isbn_number: isbnNumber}, function (err, book) {
            if (err) {
                console.error(err);
                res.status(500).send("Error getting book from DB")
            }
            res.send({book: book});
        });
    }

});
/* GET books listing. */
router.get('/all_books', function(req, res, next) {
    books.find({}, function (err, booksList) {
        if (err) {
            console.error(err);
            res.status(500).send("Error getting book from DB")
        }
        res.send(booksList);
    });

});

module.exports = router;
