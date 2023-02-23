import PropTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  const curretnSet = Math.ceil(currentPage / limit);
  const startPage = limit * (curretnSet - 1) + 1;
  const lastSet = Math.ceil(numberOfPages / limit);

  const numberOfPageForSet =
    curretnSet === lastSet ? numberOfPages % limit : limit;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {curretnSet !== 1 && (
          <li className="page-item ">
            <div
              className="page-link cursor-pointer"
              href="#"
              onClick={() => onClick(startPage - limit)}
            >
              Previous
            </div>
          </li>
        )}
        {Array(numberOfPageForSet)
          .fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <div
                  className="page-link cursor-pointer"
                  onClick={() => {
                    onClick(pageNumber);
                  }}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}
        {curretnSet !== lastSet && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              href="#"
              onClick={() => onClick(startPage + limit)}
            >
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  numberOfPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  limit: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5,
};

export default Pagination;
