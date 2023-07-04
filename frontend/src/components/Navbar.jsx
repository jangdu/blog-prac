import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-10 flex justify-between bg-white px-4 py-2 md:px-8 md:py-4">
      <Link to={"/"} className="flex items-center text-3xl md:text-4xl font-bold">
        <h1>DuhoLog</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/posts">Post</Link>
        <Link to="/about">about</Link>
      </nav>
    </header>
  );
}
