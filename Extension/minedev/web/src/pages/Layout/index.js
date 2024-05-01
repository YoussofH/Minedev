"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Layout = () => {
    return (<>
      <nav>
        <ul>
          <li>
            <react_router_dom_1.Link to="/">Home</react_router_dom_1.Link>
          </li>
          <li>
            <react_router_dom_1.Link to="/chat">Chat with Minedev</react_router_dom_1.Link>
          </li>
          <li>
            <react_router_dom_1.Link to="/nativeElements">Native Elements</react_router_dom_1.Link>
          </li>
        </ul>
      </nav>
    </>);
};
exports.default = Layout;
//# sourceMappingURL=index.js.map