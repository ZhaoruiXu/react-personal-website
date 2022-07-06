import logo from "../images/logo.png";
import NavMain from "../components/NavMain";
import Logo from "../components/Logo";

export default function Header() {
  return (
    <header>
      {/* <img className='logo' src={logo} alt='logo' /> */}
      <Logo />
      <NavMain />
    </header>
  );
}
