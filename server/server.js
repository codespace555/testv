import dotenv from "dotenv";

import app from "./app.js";
import connectDb from "./src/db.js";

dotenv.config({
  path: "./.env",
});




const PORT = 3000 || process.env.PORT
connectDb().then(() => {
    app.on( 'error', (err)=>{
        console.log("Error",+err)
    })
    app.listen(PORT, ()=>{
        console.log(`Server running on port http://localhost:${PORT}`)
    })
}).catch((err)=>console.log('Could not start server ', err))