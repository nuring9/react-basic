import PropTypes from "prop-types";

const Toast = ({ toasts }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-2">
      {toasts.map((toast) => {
        return (
          <div
            className={`alert alert-${toast.type || "success"} m-0 py-2 mt-2`}
            role="alert"
          >
            {toast.text}
          </div>
        );
      })}
    </div>
  );
};

Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};

Toast.defaultProps = {
  toasts: [],
};

export default Toast;
