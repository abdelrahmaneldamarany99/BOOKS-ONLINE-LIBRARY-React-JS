import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Book from "./components/Book/Book";
import Author from "./components/Author/Author";
import Search from "./components/Search/Search";
import Wishlist from "./components/Wishlist/Wishlist";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://openlibrary.org/subjects/finance.json?details=true")
      .then((res) => {
        const withCovers = res.data.works.filter((book) => book.cover_id);
        const withOutCovers = res.data.works
          .filter((book) => !book.cover_id)
          .slice(0, 3);
        const allBooks = withCovers.concat(withOutCovers).map((book) => {
          book.bookId = book.key.match(/\bOL.+/g).join("");
          return book;
        });
        setBooks(allBooks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home books={books} error={error} loading={loading} />} />
        <Route path="/home" element={<Home books={books} error={error} loading={loading}/>} />
        <Route
          path="/books/:bookId"
          element={<Book books={books} error={error} />}
        />
        <Route path="/authors/:authorName" element={<Author />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
