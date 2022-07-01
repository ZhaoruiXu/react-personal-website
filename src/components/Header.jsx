import logo from "../images/logo.png";
import NavMain from "../components/NavMain";

export default function Header() {
  return (
    <header>
      <img className='logo' src={logo} alt='logo' />
      <NavMain />
    </header>
  );
}
