import { Body } from "./GetStartedBody";
import { Header } from "./GetStartedHeader";
/**
 * The GetStarted function returns a JSX element with a container, header, and body components in a
 * React application.
 * @returns A JSX element is being returned. It consists of a div with a className of "container h-100"
 * and some inline styles. Inside the div, the Header and Body components are being rendered.
 */

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
