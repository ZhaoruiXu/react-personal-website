import { NavLink } from "react-router-dom";
import MenuBtn from "../components/MenuBtn";
import { useState } from "react";

export default function NavMain() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className='main-nav'>
      {isNavOpen && (
        <ul>
          <li onClick={e => e.target.blur()}>
            <NavLink to='/'>Project</NavLink>
          </li>
          <li onClick={e => e.target.blur()}>
            <NavLink to='/about'>About</NavLink>
          </li>
        </ul>
      )}
      <MenuBtn handleMenuBtnClick={() => setIsNavOpen(!isNavOpen)} />
    </nav>
  );
}
