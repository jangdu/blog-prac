"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Navbar() {
    return (<header className="fixed top-0 w-full z-10 flex justify-between bg-white px-4 py-2 md:px-8 md:py-4">
      <react_router_dom_1.Link to={"/"} className="flex items-center text-3xl md:text-4xl font-bold">
        <h1>DuhoLog</h1>
      </react_router_dom_1.Link>
      <nav className="flex items-center gap-4 font-semibold">
        <react_router_dom_1.Link to="/posts">Post</react_router_dom_1.Link>
        <react_router_dom_1.Link to="/about">about</react_router_dom_1.Link>
      </nav>
    </header>);
}
exports.default = Navbar;
