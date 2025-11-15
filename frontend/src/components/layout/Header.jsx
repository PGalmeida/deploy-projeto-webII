/*import React from "react";

const Header = () => {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src="/images/logo.png" alt="Loja Online Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" method="get">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Entre com o nome do produto ..."
              name="keyword"
              value=""
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
            Cart{" "}
          </span>
          <span className="ms-1" id="cart_count">
            0
          </span>
        </a>

        <div className="ms-4 dropdown">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src="../images/default_avatar.jpg"
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>User</span>
          </button>
          <div
            className="dropdown-menu w-100"
            aria-labelledby="dropDownMenuButton"
          >
            <a className="dropdown-item" href="/admin/dashboard">
              {" "}
              Dashboard{" "}
            </a>

            <a className="dropdown-item" href="/me/orders">
              {" "}
              Orders{" "}
            </a>

            <a className="dropdown-item" href="/me/profile">
              {" "}
              Profile{" "}
            </a>

            <a className="dropdown-item text-danger" href="/">
              {" "}
              Logout{" "}
            </a>
          </div>
        </div>

        <a href="/login" className="btn ms-4" id="login_btn">
          {" "}
          Login{" "}
        </a>
      </div>
    </nav>
  );
};

export default Header;
*/
import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img src="/images/LogoOfc.png" alt="Logo" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/tutores">Tutores</Link>
        <Link to="/consultas">Consultas</Link>
        <Link to="/medicos">Médicos</Link>
        <Link to="/agendamentos">Agendamentos</Link>
        <Link to="/animais">Animais</Link>
      </nav>

      <div className="header-right">
        <Link to="/login" className="header-login">Login</Link>
      </div>
    </header>
  )
}

export default Header
