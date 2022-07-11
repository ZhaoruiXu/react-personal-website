import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Logo() {
  const logoRef = useRef(null);

  const handleLogoClick = () => {
    logoRef.current.blur();
    console.log(logoRef.current);
  };

  return (
    <Link
      className='logo-link'
      to={`/`}
      ref={logoRef}
      onFocus={handleLogoClick}>
      <svg
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 244.45 256.99'>
        <defs></defs>
        <path
          className='cls-2'
          style={{
            strokeWidth: "7px",
            fill: "#231f20",
            stroke: "#231f20",
            strokeMiterlimit: 10,
          }}
          d='M74.54,91.41c-2.6-2.57-1.78-7,1.61-8.39,14.78-6.04,25.19-20.55,25.19-37.51,0-22.37-18.14-40.51-40.51-40.51-.39,0-.77,.02-1.15,.03v-.03H10.14c-2.84,0-5.14,2.3-5.14,5.14V125.62c0,2.84,2.3,5.14,5.14,5.14h15.64c2.84,0,5.14-2.3,5.14-5.14v-24.73c0-4.46,5.29-6.81,8.6-3.81l35.65,32.34c.95,.86,2.18,1.33,3.46,1.33h23.21c4.6,0,6.88-5.57,3.61-8.8l-30.91-30.55Z'
        />
        <path
          className='cls-2'
          style={{
            strokeWidth: "7px",
            fill: "#231f20",
            stroke: "#231f20",
            strokeMiterlimit: 10,
          }}
          d='M239.44,199.16c0,29.45-24.09,53.28-53.66,52.82-29.01-.44-52-24.74-52-53.75v-58.22s.03-.06,.06-.06h28.01s.06,.03,.06,.06v59.14c0,13.94,11.54,25.17,25.57,24.69,13.42-.46,23.85-11.92,23.85-25.35v-58.48s.03-.06,.06-.06h28s.06,.03,.06,.06v59.14h0Z'
        />
        <path
          className='cls-1'
          style={{
            strokeWidth: "5px",
            fill: "#231f20",
            stroke: "#231f20",
            strokeMiterlimit: 10,
          }}
          d='M53.68,175.38l-26.92-26.91c-2.06-2.06-5.39-2.06-7.45,0l-13.16,13.16c-2.06,2.06-2.06,5.39,0,7.45l26.92,26.92c2.06,2.06,2.06,5.39,0,7.45l-26.73,26.71c-2.06,2.06-2.06,5.39,0,7.45l13.16,13.16c2.06,2.06,5.39,2.06,7.45,0l26.73-26.72c2.06-2.06,5.39-2.06,7.45,0l26.72,26.72c2.06,2.06,5.39,2.06,7.45,0l13.17-13.16c2.06-2.06,2.06-5.39,0-7.45l-26.73-26.73c-2.06-2.06-2.06-4.21,0-6.26l26.91-28.1c2.06-2.06,2.06-5.39,0-7.45l-13.16-13.16c-2.06-2.06-5.39-2.06-7.45,0l-26.91,26.91c-2.06,2.06-5.39,2.06-7.45,0Z'
        />
        <rect
          className='cls-1'
          style={{
            strokeWidth: "5px",
            fill: "#231f20",
            stroke: "#231f20",
            strokeMiterlimit: 10,
          }}
          x='134.61'
          y='5'
          width='104.84'
          height='102.04'
          rx='10.1'
          ry='10.1'
        />
      </svg>
    </Link>
  );
}
