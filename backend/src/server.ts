import app from "./app";
import connectDB from "./db";

app.listen(8000, () => {
  connectDB();
  console.log(`Server running on port 8000`);
});
