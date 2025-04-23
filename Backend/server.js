import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
