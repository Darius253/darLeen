import { Body } from "./GetStartedBody";
import { Header } from "./GetStartedHeader";

function GetStarted() {
  return (
    <div
      className="container h-100"
      style={{
        marginTop: "30px",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Body />
    </div>
  );
}

export default GetStarted;
