var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaConsts = require('./consts');


var booksSchema = new Schema({
    title:  {type: String, required: true},
    description: String,
    isbn_number:  {type: String, required: true, unique: true},
    author: String,
    publication_date: Date,
    genre: String,
    price: {type: Number, required: true}
});



module.exports = mongoose.model(schemaConsts.BOOKS, booksSchema);

