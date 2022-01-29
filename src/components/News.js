import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url).then((news) => news.json());
    console.log(data);
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Only News`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url).then((news) => news.json());
    console.log(data);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center " style={{ marginTop: "90px" }}>
          Only News - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row d-flex">
              {this.state.articles.map((news) => {
                return (
                  <div className="col-md-4 my-3 " key={news.url}>
                    <NewsItem
                      title={news.title ? news.title.slice(0, 45) : ""}
                      description={
                        news.description ? news.description.slice(0, 88) : ""
                      }
                      imageUrl={
                        news.urlToImage
                          ? news.urlToImage
                          : "https://techcrunch.com/wp-content/uploads/2019/12/News-media-standards.jpg?w=1390&crop=1"
                      }
                      newsUrl={news.url}
                      author={news.author}
                      date={news.publishedAt}
                      source={news.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
