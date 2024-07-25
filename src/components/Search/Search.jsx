import React, { useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import BookComponent from "../BookComponent/BookComponent";
import Loading from "../Loading/Loading";
// import Error from "../Error/Error";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // inputValue=inputValue.trim()
    setInputValue(inputValue.trim());
    if (inputValue) {
      if (selectValue === "Subject") {
        setLoading(true);
        axios
          .get(
            `https://openlibrary.org/subjects/${inputValue.toLocaleLowerCase()}.json?details=true`
          )
          .then((res) => {
            const withCovers = res.data.works.filter((book) => book.cover_id);
            console.log(withCovers);
            if (withCovers.length < 9) {
              const withOutCovers = res.data.works
                .filter((book) => !book.cover_id)
                .slice(0, 3);
              const allBooks = withCovers.concat(withOutCovers).map((book) => {
                book.bookId = book.key.match(/\bOL.+/g).join("");
                return book;
              });
              setLoading(false);
              setBooks(allBooks);
            } else {
              setLoading(false);
              setBooks(withCovers);
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      } else if (selectValue === "Author Name") {
      } else {
        setLoading(true);
        let query = inputValue.replace(/\s+/g, "%20");
        axios
          .get(
            `https://openlibrary.org/search.json?q=${query}&fields=*,availability&limit=1`
          )
          .then((res) => {
            console.log(res.data.docs);
            setLoading(false);
            setBooks(res.data.docs);
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      }
    } else {
      setAlert(true);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Search by ${selectValue}`}
        />
        {/* || `Search by Title` */}

        <select
          onChange={(e) => setSelectValue(e.target.value)}
          defaultValue={"Title"}
        >
          {/* multiple */}
          <option value="Title">Title</option>
          <option value="Author Name">Author Name</option>
          <option value="Subject">Subject</option>
        </select>
      </form>
      {loading && <Loading />}
      
      <div className="container">
        {books.length ? (
          books.map((book, i) => (
            <BookComponent
              key={book._version_}
              book={book}
              index={book._version_}
            />
          ))
        ) : formSubmitted && !books.length ? (
          <h1>
            No Results
            <br />
            Please Try Again Using More Accruate/Specific Word/s
          </h1>
        ) : <h1>Search for the book/s you want</h1>
        }
        {alert && (
        <h3>Please Enter Something In The Input Field To Show Results</h3>
      )}
      </div>
      {error && <Error />}
    </div>
  );
};

export default Search;
