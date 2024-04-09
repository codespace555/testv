import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const nav = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Bill",
      link: "/bill",
    },
    {
      name: "Addproduct",
      link: "/addproduct",
    },
  ];
  return (
    <div>
      <ul className="flex bg-slate-500 gap-6 font-semibold h-14 items-center justify-center text-gray-900 text-2xl">
        {nav.map((item, index) => (
          <li key={index}>
            <Link to = {`${item.link}`} className="hover:underline" >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
