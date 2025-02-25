import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Header = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <header style={{ paddingInline: "9rem" }} className="py-4 bg-light">
      <div className="d-flex justify-content-between">
        <nav>
          <Link
            to="/"
            className="navbar-brand fs-1  text-danger"
            style={{ fontWeight: "bold" }}
            id="dancing-script"
          >
            Meetup
          </Link>
        </nav>
        <div id="search-container">
          <span className="icon">
            <FontAwesomeIcon icon={faSearch} id="search-icon" />
          </span>
          &nbsp;
          <input
            placeholder="Search by title and tags..."
            id="search-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <hr />
    </header>
  );
};
export default Header;
