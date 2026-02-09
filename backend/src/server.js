import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`✅ API running on port ${PORT}`);
  });
}

start().catch((e) => {
  console.error("❌ Server failed:", e);
  process.exit(1);
});
