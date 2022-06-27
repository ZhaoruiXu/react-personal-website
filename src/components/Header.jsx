import logo from "../images/logo.png";
import NavMain from "../components/NavMain";
import MenuBtn from "../components/MenuBtn";

export default function Header() {
  return (
    <header>
      <img src={logo} alt='logo' />
      <MenuBtn />
      <NavMain />
    </header>
  );
}
