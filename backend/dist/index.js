"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const clients_routes_1 = __importDefault(require("./routes/clients.routes"));
const bookings_routes_1 = __importDefault(require("./routes/bookings.routes"));
const sessions_routes_1 = __importDefault(require("./routes/sessions.routes"));
const exerciseTemplates_routes_1 = __importDefault(require("./routes/exerciseTemplates.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.path);
    console.log("Cookies:", req.headers.cookie);
    next();
});
app.use((0, cors_1.default)({
    origin: ["https://talaria-next.vercel.app", "https://talaria-next-icicf8ax7-danbiwotts-projects.vercel.app", "http://localhost:3000", "http://192.168.0.61:3000"],
    credentials: true,
}));
// ROUTES
app.use("/api/clients", clients_routes_1.default);
app.use("/api/bookings", bookings_routes_1.default);
app.use("/api/sessions", sessions_routes_1.default);
app.use("/api/exercise-templates", exerciseTemplates_routes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
