import Image from "./assets/image1.jpg";
import GetStarted from "./components/GetStarted";

/**
 * The App component renders a background image with blur effect and a GetStarted component in a
 * centered row.
 * @returns The App component is being returned, which contains a div with a background image and a
 * GetStarted component inside a row with text aligned to the start.
 */
function App() {
  return (
    <div className="position-relative overflow-hidden">
      <div
        className="position-absolute top-0 bottom-0 start-0 end-0"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>

      <div className="row justify-content-center">
        <div className="col text-start">
          <GetStarted />
        </div>
      </div>
    </div>
  );
}

export default App;
