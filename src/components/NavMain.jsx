import { NavLink } from "react-router-dom";
import MenuBtn from "../components/MenuBtn";
import { useState } from "react";

export default function NavMain() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className={`main-nav ${isNavOpen ? "nav-open" : ""}`}>
      <ul>
        <li onClick={() => setIsNavOpen(false)}>
          <NavLink to='/' tabIndex={isNavOpen ? 0 : -1}>
            Project
          </NavLink>
        </li>
        <li onClick={() => setIsNavOpen(false)}>
          <NavLink to='/about' tabIndex={isNavOpen ? 0 : -1}>
            About
          </NavLink>
        </li>
      </ul>

      <MenuBtn
        handleMenuBtnClick={() => setIsNavOpen(!isNavOpen)}
        isNavOpen={isNavOpen}
      />
    </nav>
  );
}
