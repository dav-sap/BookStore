import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BookList from "./BookList/BookList";
import AddModal from  "./AddModal/AddModal"


class Home extends PureComponent {
    static defaultProps = {};

    static propTypes = {};
    state = {
        books: [],
        addModalVisible: false
    }


    showAddModal = () => {
        this.setState({ addModalVisible: true });
    };

    hideAddModal = () => {
        this.setState({ addModalVisible: false });
        this.fetchBooks()
    };

    fetchBooks = async () => {
        try {
            let reqProps = {
                method: 'GET'
            };
            let response = await fetch("/books/all_books", reqProps);
            if (response.status === 200) {
                console.log(response)
                let books = await response.json();
                console.log(books)
                this.setState({books})
            }
        } catch (err) {
            console.error(err)
        }
    }

    componentDidMount() {
        this.fetchBooks()
    }


    render() {
        return (
            <div className="home">
                <img src="/images/add.png" className="add-icon" alt="add book" onClick={this.showAddModal}/>

                <AddModal show={this.state.addModalVisible} new={true} handleClose={this.hideAddModal}/>
                <BookList books={this.state.books} fetchBooks={this.fetchBooks}/>
            </div>
        );
    }
}

export default Home;
