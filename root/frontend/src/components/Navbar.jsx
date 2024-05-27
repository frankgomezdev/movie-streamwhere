import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>New</a></li>
        <li><a>Popular</a></li>
      </ul>
    </div>
    <a className="hidden md:flex md:btn md:btn-ghost md:text-xl">StreamWhere</a>
  </div>
  <div className="navbar-center">
  <div className="form-control">
      <input type="text" placeholder="Search for movies or series..." className="input input-bordered w-96" />
    </div>
  </div>
  <div className="navbar-end hidden lg:flex">
  <ul className="menu menu-horizontal px-1">
      <li><a>New</a></li>
      <li><a>Popular</a></li>
    </ul>
  </div>
</div>
  );
};

export default Navbar;

