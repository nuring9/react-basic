import PropTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPage }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {Array(numberOfPage)
          .fill(1)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <a className="page-link" href="#">
                  {pageNumber}
                </a>
              </li>
            );
          })}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
