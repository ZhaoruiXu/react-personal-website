export default function MenuBtn({ handleMenuBtnClick }) {
  return (
    <button
      className='menu-button'
      onClick={handleMenuBtnClick}
      aria-label='Navigation menu button'>
      <div className={`bar bar1`}></div>
      <div className={`bar bar2`}></div>
    </button>
  );
}
