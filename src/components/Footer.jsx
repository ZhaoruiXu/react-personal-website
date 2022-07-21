export default function Footer({ isLoaded }) {
  if (isLoaded) {
    return (
      <footer>
        <p>
          designed and built by zhaorui xu <span>&copy;</span>
          2022
        </p>
      </footer>
    );
  }
}
