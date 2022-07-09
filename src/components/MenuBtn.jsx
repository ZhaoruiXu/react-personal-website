export default function MenuBtn({ handleMenuBtnClick }) {
  return (
    <button
      className='menu-button'
      onClick={handleMenuBtnClick}
      aria-label='Navigation menu button'>
      <div className={`menu-line top`}></div>
      <div className={`menu-line bottom`}></div>
    </button>
  );
}
