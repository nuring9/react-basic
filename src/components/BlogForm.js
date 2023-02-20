import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/posts", {
        title,
        body,
        createdAt: Date.now(),
      })
      .then((res) => {
        navigate("/blogs");
      });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          row="10"
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post
      </button>
    </div>
  );
};

export default BlogForm;
