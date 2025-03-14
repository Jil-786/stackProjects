import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Card.css";
export default function Card(props) {
  return (
    <div className="card" style={{ width: "15rem" }}>
      <img src={props.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        
        {/* ✅ If description exists, show it with spacing. Otherwise, add extra space */}
        {props.description ? (
          <p className="card-text mb-3">{props.description}</p>
        ) : (
          <div className="mb-4"></div>
        )}

        <Link 
          to={{
            pathname: props.uri
          }} 
          state={{ title: props.title }}
          className="btn btn-primary w-100"
        >
          {props.title}
        </Link>
      </div>
    </div>
  );
}
