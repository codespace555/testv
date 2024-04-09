import React, { useEffect, useState } from "react";
import { searchProduct } from "../controller/controller";
import debounce from "lodash.debounce";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Bill() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [allitem, setAllitem] = useState([]);
  const [total, seTotal] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const searchProducts = debounce(async (item) => {
    if (searchTerm.trim() !== "") {
      const res = await searchProduct(item);
      setSuggestions(res.product);
      setTotalPages(res.totalPages);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, 1000);

  useEffect(() => {
    searchProducts(searchTerm);
  }, [searchTerm, currentPage]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const product = {
    title: searchTerm,
    quantity: quantity,
    price: price,
  };
  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const items = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setAllitem(items);
  }, [cart]);

  useEffect(() => {
    let sum = 0;
    allitem?.forEach((element) => {
      sum = sum + parseInt(element.price * element.quantity);
    });
    seTotal(sum);
  }, [allitem]);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const generatePreview = () => {
    html2canvas(document.getElementById('bill')).then((canvas) => {
      setPreviewContent(canvas.toDataURL('image/png'));
      setPreviewVisible(true);
    });
  };

  
   

  const printPreview = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Preview</title></head><body>');
    printWindow.document.write('<img src="' + previewContent + '" style="max-width: 100%;"/>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="bg-slate-950 h-screen w-full md:flex">
        <div className="md:w-1/2">
          <div className="md:flex gap-10 p-5  ">
            <div>
              <input
                type="text"
                placeholder="Search..."
                id="searchInput"
                className="p-2 bg-gray-500 mb-3"
                value={searchTerm}
                onChange={handleChange}
              />
              {showSuggestions && (
                <div className="bg-gray-600">
                  <ul className="suggestions-list ">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                  <div className="pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span>
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="price"
                id="searchInput"
                className="p-2 bg-gray-500 mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="quantity"
                id="searchInput"
                className="p-2 bg-gray-500 mb-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <button
            className="bg-slate-600 relative  m-5 px-5 rounded-md"
            onClick={addToCart}
          >
            Add+
          </button>
        </div>

        <div className="  p-5 bg-slate-500 md:w-1/2 ">
          <h3 className="font-bold text-4xl mb-8">Bill</h3>

          <div className=" justify-center items-center bg-slate-300 rounded p-5 overflow-scroll" id="bill">
            <h2 className="mb-10">
              Bill Id- <span>{Date.now()}</span>
            </h2>
            <table className="w-full text-left rounded shadow-md bg-slate-300">
              <thead className="border-b border-solid border-gray-500 bg-slate-400">
                <tr>
                  <th className="text-sm font-normal text-gray-700 py-4 px-6">
                    Item
                  </th>
                  <th className="text-sm font-normal text-gray-700 py-4 px-6">
                    Price(Rs)
                  </th>
                  <th className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                    Quantity
                  </th>
                  <th className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                    Total
                  </th>
                  <th className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                    ❌
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-slate-200 h-28 overflow-y-scroll scrollbar-hide "
                
              >
                {allitem?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-sm font-normal text-gray-700 py-4 px-6 ">
                      {item.title}
                    </td>
                    <td className="text-sm font-normal text-gray-700 py-4 px-6">
                      {item.price}
                    </td>
                    <td className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                      {item.quantity}
                    </td>
                    <td className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                      {item.quantity * item.price}
                    </td>
                    <td className="text-sm font-normal text-center text-gray-700 py-4 px-6">
                      <button onClick={() => removeFromCart(index)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr className="px-5">
                  <td
                    className="text-sm font-normal text-gray-700 py-4 px-6 "
                    colSpan={3}
                  >
                    Grand Total
                  </td>
                  <td className="text-sm font-normal text-center text-gray-700  ">
                    {total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={generatePreview} className="m-5 bg-slate-600 px-5 py-2 rounded-md">
            Preview
          </button>
        </div>
        {previewVisible && (
        <div className="absolute left-56">
          <h2>Preview</h2>
          <button className="w-full bg-gray-200" onClick={() => setPreviewVisible(!previewVisible)}>❌</button>
          <img src={previewContent} alt="Preview" style={{ maxWidth: '100%' }} />
          <button className="bg-gray-200 w-full" onClick={printPreview}>Print</button>
        </div>
      )}
      </div>
    </>
  );
}

export default Bill;
