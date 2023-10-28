"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connect_1 = __importDefault(require("./config/db-connect"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_js_1 = __importDefault(require("./routes/user-routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const MONGO_URI = process.env.MONGO_URI;
(0, db_connect_1.default)(MONGO_URI);
if (!MONGO_URI) {
    throw new Error("The MONGO_URI environment variable is not defined.");
}
app.get("/", (_, res) => {
    res.status(200).send("I'm alive!");
});
// usado para interpretar os corpos das solicitaçÕes recebidas como json
app.use(express_1.default.json());
app.use(express_1.default.json(), user_routes_js_1.default);
app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
