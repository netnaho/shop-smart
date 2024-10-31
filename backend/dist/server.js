"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
// cors
app.use((0, cors_1.default)({
    origin: true,
    methods: " GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
}));
// Connect to MongoDB
(0, db_1.connectDB)();
// cookie-parser
app.use((0, cookie_parser_1.default)()); // used to set cookie in web browser
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
