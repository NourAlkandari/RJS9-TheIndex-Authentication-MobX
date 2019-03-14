import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authStore from "./stores/AuthStore";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
          {authStore.user ? (
            <h4 className="menu-item active">
              <button
                className="transparent"
                onClick={() => authStore.logout()}
              >
                Logout
              </button>
            </h4>
          ) : (
            <div>
              <h4 className="menu-item active">
                <NavLink to="/login/">log-in</NavLink>
              </h4>
              <h4 className="menu-item active">
                <NavLink to="/signup/">Sign-up</NavLink>
              </h4>
            </div>
          )}
        </section>
      </div>
    );
  }
}
export default observer(Sidebar);
