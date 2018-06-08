import React, {PureComponent} from 'react';
import './add-modal.css'
import Input from 'react-md-input';

const genres = ["Science fiction", "Satire", "Drama", "Action", "Romance", "Mystery", "Horror"]

class AddModal extends PureComponent {

    state = {
        title: "",
        isbnNumber: "",
        description: "",
        author: "",
        publicationDate: "",
        genre: "",
        price: ""
    }
    addBook = async () => {
        try {
            let reqProps = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },

                body: JSON.stringify({
                    "title": this.state.title,
                    "isbn_number": this.state.isbnNumber,
                    "description": this.state.description,
                    "author": this.state.author,
                    "publication_date": this.state.publicationDate,
                    "genre": this.state.genre,
                    "price": this.state.price
                })
            };
            let response = await fetch("/books/new_book", reqProps);
            if (response.status === 200) {
                alert("Book Added!");
                this.props.handleClose();
            } else {
                alert("Error! try changing id ISBN Number");
                console.error(response)
            }
        } catch (err) {
            alert("Error! try changing id ISBN Number");
            console.error(err)
        }
    }

    fetchBook = async (isbnNumber) => {
        try {
            let reqProps = {
                method: 'GET',
            };
            let response = await fetch("/books/get_book?isbnNumber=" + isbnNumber, reqProps);
            let resJson = await response.json();
            if (response.status === 200 && resJson.book) {
                console.log(resJson);
                this.setState({
                    title: resJson.book.title,
                    isbnNumber: resJson.book.isbn_number,
                    description: resJson.book.description,
                    author: resJson.book.author,
                    publicationDate: resJson.book.publication_date.toString().substring(0, resJson.book.publication_date.toString().indexOf('T')),
                    genre: resJson.book.genre,
                    price: resJson.book.price.toString()
                })
            } else {
                console.error(response)
            }
        } catch (err) {
            console.error(err)
        }
    }
    resetState = () => {
        this.setState({
            title: "",
            isbnNumber: "",
            description: "",
            author: "",
            publicationDate: "",
            genre: "",
            price: ""
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT ", nextProps.new);
        if (nextProps.new) {
            this.resetState();
        }
        else if (!nextProps.new && nextProps.isbnNumber !== undefined){
            this.fetchBook(nextProps.isbnNumber)
        }
    }

    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName} onClick={this.props.handleClose}>
                <section className="modal-main" onClick={(e) => e.stopPropagation()}>
                    <div className="inputs">
                        <Input label="Name" type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                        <Input label="Publication Date" type="date" value={this.state.publicationDate} onChange={(e) => this.setState({publicationDate: e.target.value})}/>

                        <Input label="Description" type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
                        <Input label="Author" type="text" value={this.state.author} onChange={(e) => this.setState({author: e.target.value})}/>
                        <Input label="ID Number" type="Number" value={this.state.isbnNumber} onChange={(e) => this.setState({isbnNumber: e.target.value})}/>
                        <Input label="Price" type="Number" value={this.state.price} onChange={(e) => this.setState({price: e.target.value})}/>
                        <div className="sc-bdVaJa VPraL">
                            <div className="sc-bwzfXH ghuPdm">
                                <select className="sc-ifAKCX WCyvA" value={this.state.genre} onChange={(e) => this.setState({genre: e.target.value})}>
                                    <option value="" disabled selected>Select your option</option>
                                    {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
                                </select>
                                <span className="sc-EHOje epqXLS"/>
                                <span className="sc-bxivhb fYSNVD"/>
                                <label className="sc-htpNat hqpwMW">Genre</label>
                            </div>
                        </div>

                    </div>

                    <button className="modal-button" onClick={this.addBook}>Add</button>
                    <button className="modal-button" onClick={this.props.handleClose}>Close</button>
                </section>
            </div>
        );
    }
}

export default AddModal;
