import PuffLoader from "react-spinners/PuffLoader";

export default function LoadingScreen({ playLoadingAnimation, isLoaded }) {
  if (!isLoaded || playLoadingAnimation) {
    return (
      <div className={`loading-animation-wrapper ${!isLoaded ? "close" : ""}`}>
        <PuffLoader
          className='loading-animation'
          cssOverride={{
            display: "block",
            position: "absolute",
          }}
          color='#ffffff'
          speedMultiplier={2}
        />
      </div>
    );
  }
}
