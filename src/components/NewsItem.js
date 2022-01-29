import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <div className="d-flex justify-content-end position-absolute top-0 end-0">
            <span className="badge rounded-pill bg-danger">
              {source ? source : "Unknown"}
            </span>
          </div>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="images"
            height={"150px"}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-primary btn-sm"
              rel="noreferrer"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
