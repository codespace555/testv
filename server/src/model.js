import  mongoose, {Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a product title."],
      
    },
},
{
    timestamps: true // Saves created
}
)

ProductSchema.index({
    title: "text",
  });

const Product = mongoose.model("Product", ProductSchema);

export {Product}