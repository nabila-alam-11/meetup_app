import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header style={{ paddingInline: "9rem" }} className="py-4 bg-light">
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
      <hr />
    </header>
  );
};
export default Header;
