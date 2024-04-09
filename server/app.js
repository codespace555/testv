import express from "express";
import cors from "cors"


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
const limit = "16kb";
app.use(express.json({ limit: limit }));
app.use(express.urlencoded({ extended: true, limit: limit }));
app.use(express.static("public"));

app.get("/",(req, res) => {
  res.status(200).send({
    data: "product Server",
  });
})

import addproductRouts  from "./src/routes.js"
app.use("/api/",addproductRouts )


export default app