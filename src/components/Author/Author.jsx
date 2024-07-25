import React, { Fragment, useEffect, useState } from "react";
import "./Author.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import authorNotFound from "../../assets/images/page-not-found-688965_960_720-8.png";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const Author = () => {
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const query = params.authorName.replaceAll(/\s+/g, "%20");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://openlibrary.org/search/authors.json?q=${query}`)
      .then((res) => {
        setAuthor(res.data.docs.find((au) => au.name === params.authorName));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="author-component">
        {error && <Error />}
        {loading && <Loading />}

        <h1 className="title">{author.name}</h1>
        <div className="container">
          <img
            src={
              !author?.key?.includes("works")
                ? `https://covers.openlibrary.org/a/olid/${author.key}-L.jpg`
                : authorNotFound
            }
            className="author-img"
            alt={author.name ? `${author.name} + ' image'` : ""}
          />
          <ul className="author-list">
            <li className="author-list-item">Author Name : {author.name}</li>
            <li className="author-list-item">
              Work count : {author.work_count}
            </li>
            <li className="top-subjects">Top subjects of the author :</li>
            <li className="subjects">
              <span className="subject">
                {author.top_subjects?.join(" - ")}
              </span>

              {/* <span className="subject">{author.top_subjects[0]}</span>
              <span className="subject">{author.top_subjects[1]}</span>
              <span className="subject">{author.top_subjects[2]}</span>
              <span className="subject">{author.top_subjects[3]}</span>
              <span className="subject">{author.top_subjects[4]}</span> */}

              {/* {
              author.top_subjects.map((subject,i)=>{
                if(i<5){
                  return <span key={i} className="subject">{author.top_subjects[i]}</span>
                }
              })
            } */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Author;
