import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import bookCases from "../../assets/images/bookcases-1869616_960_720.jpg";

const Nav = () => {
  return (
    <header>
      <Link className="header-list-item" to="/home">
        <img src={bookCases} className="logo-img" alt="logo" />
      </Link>
      <ul className="header-list">
        <li>
          <Link className="header-list-item" to="/home">
            home
          </Link>
        </li>
        <li>
          <Link className="header-list-item" to="/search">
            search
          </Link>
        </li>
        <li>
          <Link className="header-list-item" to="/wishlist">
            wishlist
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
