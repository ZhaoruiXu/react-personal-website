export default function MenuBtn() {
  return (
    <button
      className='menu-button'
      onMouseDown={e => {
        e.preventDefault();
      }}
      aria-label='Navigation menu button'>
      <div className={`bar bar1`}>1</div>
      <div className={`bar bar2`}>2</div>
    </button>
  );
}
