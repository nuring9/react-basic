import PropTypes from "prop-types";

const Toast = ({ toasts, deleteToast }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-2">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            onClick={() => {
              deleteToast(toast.id);
            }} // 함수를 바로 적용할 수 있지만, ()를 넣어주면 바로 호출해주기 때문에, arrow 함수를 넣어주어 실행을 해주었다.
            className={`cursor-pointer alert alert-${
              toast.type || "success"
            } m-0 py-2 mt-2`}
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
  deleteToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  toasts: [],
};

export default Toast;
