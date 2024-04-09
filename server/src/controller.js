import { Product } from "./model.js";

const addProduct = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      console.log("Plese give product name");
      res.status(400).json({
        status: 400,
        success: false,
        message: "please provide the product title",
      });
    }

    const product = await Product.create({ title });

    if (!product) {
      console.log("product not add");
      res.status(400).json({
        status: 400,
        success: false,
        message: "Prooduct not add",
      });
    }
      res.status(200).json({
        status: 200,
        success: true,
        product: product,
        message: "Prooduct  add successfully",
      });
    
  } catch (error) {
    console.log(error);
  }
};

const SearchProduct = async (req, res) => {
  let searchKeyword = req.query.search;
  console.log("Search Keyword : ", searchKeyword);
  // Checking the keyword is empty or not
  if (
    !searchKeyword ||
    typeof searchKeyword !== "string" ||
    searchKeyword.trim() === ""
  ) {
    res.status(400).json({ error: "Invalid search keyword" });
  }

  const searchWords = searchKeyword.trim().toLowerCase().split(/\s+/)

  const searchConditions = searchWords.map(word => ({
    title: { $regex: new RegExp(word, "i") } 
  }));

  
  const products = await Product.find({ $or: searchConditions }).exec();
  console.log("Products found:", products);

  if (products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }
 const productTitles = products.map(product => product.title);
  return res.status(200).json({product:productTitles});
};

const getProduct = async(req ,res)=>{
  const product = await Product.find({});
  let products = [...product];
  res.status(200).json({product:products});
}

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};


export { addProduct,SearchProduct ,getProduct,deleteProduct };
