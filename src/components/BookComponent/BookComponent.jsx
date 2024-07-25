import React from "react";
import "./BookComponent.css";
import { Link } from "react-router-dom";

const BookComponent = ({ book, index }) => {
  book.author=book.authors[0].name || book.author_name[0] || 'Not Found'
  return (
    <div className="card card-custom-style">
      <Link to={`/books/${book.bookId}`} className="card-anchor">
        <div className="book-content">
          <img
            className="card-img"
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
            alt={!book.cover_id ? "Book Cover Not Available" : ""}
          />
          <ul>
            <li>Publication Year : {book.first_publish_year}</li>
            <li>Book Title : {book.title}</li>
            <li>
              Author/s :{/* <Link to={`/authors/${book.authors[0].name}`}> */}
              {book.author}
              {/* </Link> */}
            </li>
          </ul>
          {/* <h6>More | Wishlist</h6> */}
        </div>
      </Link>
    </div>
  );
};

export default BookComponent;
