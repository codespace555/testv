import axios from "axios";

const addaproduct = async (title) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/addProduct`,
        {
          title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     return response.data;
      
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const getProduct = async() =>{
    try {
        const response = await axios.post(
          `http://localhost:3000/api/getproduct`,
         
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
       return response.data;
        
      } catch (error) {
        console.error("Error adding product:", error);
      }

  }

  const deletedProduct = async (id) => {
    try {
     await axios.delete(
        `http://localhost:3000/api/deleteproduct/${id}`
      );
    
    } catch (error) {
      console.error("Error deleting product:", error);
      // You might want to handle errors more gracefully here
    }
  };

  const searchProduct = async (search) => {
    try {
    const res =  await axios.get(
        `http://localhost:3000/api/productsearch/search?search=${search}`
      );
      
    return res.data
    } catch (error) {
      console.error("Error search product:", error);
      // You might want to handle errors more gracefully here
    }
  };

  

  export {addaproduct,getProduct,deletedProduct,searchProduct}
