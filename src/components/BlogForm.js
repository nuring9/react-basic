import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast";

const BlogForm = ({ editing }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  const [body, setBody] = useState("");
  const [originalBody, setOriginalBody] = useState("");

  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // const [toasts, setToasts] = useState([]);
  const toasts = useRef([]);
  const [toastsRerender, setToastsRerender] = useState(false);

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalPublish(res.data.publish);
      });
    }
  }, [id, editing]);

  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  const goBack = () => {
    if (editing) {
      navigate(`/blogs/${id}`);
    } else {
      navigate("/blogs");
    }
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };

  const validateForm = () => {
    let validated = true;

    if (title === "") {
      setTitleError(true);
      validated = false;
    }

    if (body === "") {
      setBodyError(true);
      validated = false;
    }

    return validated;
  };

  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter((toast) => {
      return toast.id !== id; // id가 다를 경우에만 남겨두고, 같은 경우에만 삭제
    });
    toasts.current = filteredToasts;
    // setToasts(filteredToasts);
    setToastsRerender((prev) => !prev);
  };

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id, // id: id
    };

    toasts.current = [...toasts.current, toastWithId];
    // setToasts((prev) => [...prev, toastWithId]);
    setToastsRerender((prev) => !prev);

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if (validateForm()) {
      if (editing) {
        axios
          .patch(`http://localhost:3001/posts/${id}`, {
            title,
            body,
            publish,
          })
          .then((res) => navigate(`/blogs/${id}`));
      } else {
        axios
          .post("http://localhost:3001/posts", {
            title,
            body,
            createdAt: Date.now(),
            publish,
          })
          .then((res) => {
            addToast({
              type: "success",
              text: "Successfully created!",
            });
            // navigate("/admin");
          });
      }
    }
  };

  return (
    <div>
      <Toast toasts={toasts.current} deleteToast={deleteToast} />
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError ? "border-danger" : ""}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {titleError && <div className="text-danger">Title is required.</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={`form-control ${bodyError ? "border-danger" : ""}`}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          row="10"
        />
        {bodyError && <div className="text-danger">Body is required.</div>}
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="from-check-label">Publish</label>
      </div>

      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-3" onClick={goBack}>
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: PropTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
