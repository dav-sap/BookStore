import React, {PureComponent} from 'react';
import './book-list.css'
import AddModal from "../AddModal/AddModal";

class BookList extends PureComponent {
    state = {
        addModalVisible: false,
        isbnNumber: undefined,
    }
    removeBook = async (isbnNumber) => {
        try {
            let reqProps = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },

                body: JSON.stringify({
                    "isbn_number": isbnNumber,
                })
            };
            let response = await fetch("/books/remove_book", reqProps);
            if (response.status === 200) {
                alert("Book Removed!");
                this.props.fetchBooks();
            } else {
                console.error(response)
            }
        } catch (err) {
            console.error(err)
        }
    }
    hideAddModal = () => {
        this.setState({
            addModalVisible: false
        })
        this.props.fetchBooks();

    }
    render() {
        return (
            <div className="book-list">

                <AddModal show={this.state.addModalVisible} new={false} isbnNumber={this.state.isbnNumber} handleClose={this.hideAddModal}/>
                {this.props.books.map((book, index) => {
                    return (
                        <div className="book" key={index}>
                            <div className="title" onClick={() => this.setState({isbnNumber: book.isbn_number, addModalVisible: true})}>
                                {book.title}
                            </div>
                            <div className="price">
                                {book.price}$
                            </div>
                            <img src="/images/remove.jpg" className="remove-icon" alt="remove-book" onClick={() => this.removeBook(book.isbn_number)}/>
                        </div>)
                })}
            </div>
        );
    }
}

export default BookList;
