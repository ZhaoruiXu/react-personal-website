import NavMain from "../components/NavMain";
import Logo from "../components/Logo";

export default function Header({ isLoaded }) {
  if (isLoaded) {
    return (
      <header>
        <Logo />
        <NavMain />
      </header>
    );
  }
}
