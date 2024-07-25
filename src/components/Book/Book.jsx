import React, { useState, Fragment } from "react";
import "./Book.css";
import { Link, useParams } from "react-router-dom";
import bookNotFound from "../../assets/images/page-not-found-688965_960_720-8.png";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const Book = ({ books, error }) => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.bookId;
  setTimeout(() => {
    setLoading(false);
  }, 7000);
  return (
    <Fragment>
      {loading && <Loading />}
      {!books.length && <Error />}

      {/* {!books.some((book) => book.key.includes(id)) && <Error />} */}

      {books.map((book) => {
        if (book.key.includes(id)) {
          return (
            <Fragment key={id}>
              <h1>{book.title}</h1>
              <div className="container">
                <img
                  src={
                    book.cover_id
                      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                      : bookNotFound
                  }
                  className="book-img"
                  alt=""
                />
                <ul className="book-list">
                  <li className="book-list-item">
                    First publish year : {book.first_publish_year}
                  </li>
                  <li className="book-list-item">Book title : {book.title}</li>
                  <li className="book-list-item">
                    Author/s names :
                    <Link to={`/authors/${book.authors[0].name}`}>
                      {book.authors[0].name}
                    </Link>
                  </li>
                  <li className="book-list-item">
                    Editions count : {book.edition_count}
                  </li>
                </ul>
                {/* {error && <Error />} */}
              </div>
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

export default Book;
