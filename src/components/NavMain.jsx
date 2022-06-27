import { NavLink } from "react-router-dom";

export default function NavMain() {
  return (
    <nav>
      <ul>
        <li onClick={e => e.target.blur()}>
          <NavLink to='/'>Project</NavLink>
        </li>
        <li onClick={e => e.target.blur()}>
          <NavLink to='/about'>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}
