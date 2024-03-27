import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import tremyIsotipo from "../../img/tremy-isotipo.png";


export const ClientNavbar = () => {

  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = () => {

    const response = actions.logOut()

    if(response) {

      navigate("/") 
    }
  }

  useEffect(() => {

    console.log("Navbar");

  }, [store.token]);

  return (

    <nav className="client-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            className="navbar-img mx-3"
            role="button"
            src={tremyIsotipo}
            onClick={() => navigate("/client/home")}
            alt="Tremy Isotipo"
          />

          {store.user && <h5 className="mb-0 mt-2"><strong>Hello {store.user.name}!</strong></h5>}
        </div>

        <div className="d-flex align-items-center">
          {store.token && (
            <>
              <button className="notificationBell btn mr-3">
                <i className="fa-regular fa-bell"></i>
              </button>
            </>
          )}

          <div className="dropdown">
            <button className="userButton btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-regular fa-user rounded"></i>
            </button>
            <ul className="clientDropdown dropdown-menu">
              <li><Link to="/client/profile" className="dropdown-item text-secondary btn">User Profile</Link></li>
              <li><button className="dropdown-item text-secondary" type="button">Account Details</button></li>
              <li><button className="dropdown-item text-secondary" type="button">Purchase History</button></li>
              <li><button className="dropdown-item text-secondary" type="button">Get Help</button></li>
              <li><p className="clientDropdownLine">________________________</p></li>
              <li><button onClick={() => handleLogout()} className="dropdown-item btn">Log Out <i className="fa-solid fa-right-from-bracket"></i>
              </button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};