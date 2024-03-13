import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./header.scss";

function Header() {
  const { setDateAndFilter } = useContext(AppointmentContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        Beauty
        <br />
        Admin
      </Link>
      <nav>
        <ul className="header__list">
          <li className="header__link">
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                isActive ? "header__link_active" : ""
              }
            >
              Schedule
            </NavLink>
          </li>
          <li className="header__link">
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "header__link_active" : ""
              }
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
