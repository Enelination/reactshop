import * as React from "react";
import {
  NavLink,
  RouteComponentProps,
  withRouter,
  useLocation,
  useHistory
} from "react-router-dom";
import "url-search-params-polyfill";

import Logo from "../assets/logo.svg";
import "./Header.css";
import BasketSummary from "./BasketSummary";

const Header: React.FC<RouteComponentProps> = () => {
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get("search") || "");
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push(`/products?search=${search}`);
    }
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
        <BasketSummary />
      </div>
      <img src={Logo} className="header-logo" alt="logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-active"
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className="header-link"
          activeClassName="header-link-active"
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-active"
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default withRouter(Header);
