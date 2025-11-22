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
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, getUserInfo, logout as logoutUser, isAdmin } from "../../utils/auth"
import "./Header.css"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar status de autenticação
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      const userInfo = getUserInfo()
      setLoggedIn(authenticated)
      setUser(userInfo)
    }

    checkAuth()
    
    // Atualizar quando o localStorage mudar
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    // Verificar periodicamente (para mudanças na mesma aba)
    const interval = setInterval(checkAuth, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    setLoggedIn(false)
    setUser(null)
    navigate("/")
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img src="/images/medvet_image.png" alt="MedVet Logo" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/agendamentos">Consultas</Link>
        <Link to="/medicos">Veterinários</Link>
        <Link to="/clinicas">Clínicas</Link>
        <Link to="/medvet-ia">IA</Link>
      </nav>

      <div className="header-right">
        {loggedIn && user ? (
          <div className="header-user-info">
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              {isAdmin() && <span className="user-badge">Admin</span>}
            </div>
            <Link to="/perfil" className="header-profile">
              Perfil
            </Link>
            <button onClick={handleLogout} className="header-logout">
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="header-login">Login</Link>
        )}
      </div>
    </header>
  )
}

export default Header
