import "module-alias/register";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import clientRoutes from "./routes/clients.routes";
import bookingRoutes from "./routes/bookings.routes";
import sessionRoutes from "./routes/sessions.routes";
import exerciseTemplateRoutes from "./routes/exerciseTemplates.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.path);
  console.log("Cookies:", req.headers.cookie);
  next();
});

app.use(cors({
  origin:  ["http://localhost:3000","http://192.168.0.61:3000"],
  credentials: true,
}));

// ROUTES
app.use("/api/clients", clientRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/exercise-templates", exerciseTemplateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
