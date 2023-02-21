import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul
          style={{
            flexDirection: "row",
          }}
          className="navbar-nav"
        >
          <li className="nav-item me-2">
            <NavLink
              className={(isActive) => "nav-link" + (!isActive ? "active" : "")}
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(isActive) => "nav-link" + (!isActive ? "active" : "")}
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
