import axios from "axios";
import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import Card from "../components/Card";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = (page = 1) => {
    let params = {
      _page: page,
      _limit: 5,
      _sort: "id",
      _order: "desc",
    };

    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios
      .get(`http://localhost:3001/posts`, {
        params,
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return <div>"No blog posts found"</div>;
  }

  const renderBlogList = () => {
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => navigate(`/blogs/${post.id}`)}
        >
          {isAdmin ? (
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => deleteBlog(e, post.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </Card>
      );
    });
  };

  return (
    <div>
      {renderBlogList()}
      <Pagination currentPage={3} numberOfPage={5} />
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: PropTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
