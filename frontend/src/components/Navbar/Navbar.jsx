import React, { useState } from "react";
import "./Navbar.scss";
import { HiMenuAlt4, HiX } from "react-icons/hi";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <p>Product List</p>
      </div>
      <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/addproduct`}>Add</a>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/addproduct`}>Mass Delete</a>
          </li>
        
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <div>
            <HiX onClick={() => setToggle(false)} />
             
              <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/addproduct`}  onClick={() => setToggle(false)}>Add</a>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/addproduct`}  onClick={() => setToggle(false)}>Mass Delete</a>
          </li>
        
      </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
