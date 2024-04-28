import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat">Chat with Minedev</Link>
          </li>
          <li>
            <Link to="/nativeElements">Native Elements</Link>
          </li>
        </ul>
      </nav>
    </>
  )
};

export default Layout;
