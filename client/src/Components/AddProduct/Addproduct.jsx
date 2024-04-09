import React, { useEffect, useState } from "react";
import {
  addaproduct,
  deletedProduct,
  getProduct,
} from "../controller/controller";

function Addproduct() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ title: "" });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProduct();
      setProducts(response.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const product = await addaproduct(data.title);
      setMessage(product.message);
      setData({ title: "" });
      setOpen(!open);
      fetchProducts();
    } catch (error) {
      setMessage("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const deletedProducts = async (id) => {
  await deletedProduct(id);
  fetchProducts();
   
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-screen bg-slate-900  md:flex  text-5xl text-gray-500">
      <div className="flex flex-col bg-slate-600 items-center w-full ">
        <div className="flex bg-slate-800 w-full justify-between">
          <h1 className="text-2xl text-gray-700 text-center p-5 h-24 ">
            Added Product
          </h1>
          <button
            onClick={handleOpen}
            className="bg-slate-600 px-5 py-1 m-2 rounded-lg text-xl "
          >
            Add Product
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-2xl flex flex-wrap">
            {products.length > 0 ? (
              products.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between gap-8 bg-stone-900 m-2 p-2"
                >
                  <span>{item.title}</span>
                  <button onClick={() => deletedProducts(item._id)}>X</button>
                </li>
              ))
            ) : (
              <p>No products found</p>
            )}
          </ul>
        )}
      </div>

      <div
        className={`${
          open ? "flex" : "hidden"
        }  rounded-md shadow-xl z-50 overflow-y-auto absolute top-1/2 md:left-1/3 transform -translate-x text-2xl m-5 `}
      >
        <div className="bg-gray-400 md:w-full  overflow-hidden">
          <button className="p-2" onClick={handleClose}>
            X
          </button>

          <form
            onSubmit={handleClick}
            className="flex p-5 bg-black gap-5 flex-wrap "
          >
            <input
              type="text"
              placeholder="Product Name"
              onChange={onChange}
              value={data.title}
              name="title"
              className="rounded-lg bg-gray-800 p-2 "
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-stone-950 p-2 text-xl"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
