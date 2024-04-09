import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bill from "./Components/Bill/Bill.jsx";
import Addproduct from "./Components/AddProduct/Addproduct.jsx";
import Home from "./Components/Home.jsx/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bill",
        element: <Bill />,
      },
      {
        path: "/addproduct",
        element: <Addproduct />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router} />
 
);
