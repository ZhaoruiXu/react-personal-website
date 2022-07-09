export default function MenuBtn({ handleMenuBtnClick, isNavOpen }) {
  return (
    <button
      className={`menu-button ${isNavOpen ? "nav-open" : ""}`}
      onClick={handleMenuBtnClick}
      aria-label='Navigation menu button'>
      <div className={`menu-line top`}></div>
      <div className={`menu-line bottom`}></div>
    </button>
  );
}
