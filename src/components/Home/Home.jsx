import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import BookComponent from "../BookComponent/BookComponent";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const Home = ({ books, error, loading }) => {
  return (
    <div>
      <div className="home-copmonent">
        <h1>Subject : Finance</h1>
        {loading && <Loading />}
        <div className="container">
          {books.map((book, i) => {
            return <BookComponent book={book} key={i} />;
          })}
        </div>
        {error && <Error />}
      </div>
      {/* <div className="footer">{""}</div> */}
    </div>
  );
};

export default Home;
