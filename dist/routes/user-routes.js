"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const validations_1 = require("../middlewares/validations");
const router = express_1.default.Router();
router.get("/users", user_controller_1.default.getUsers);
router.get("/users/search", user_controller_1.default.search);
router.get("/users/:id", validations_1.validateIdFormat, user_controller_1.default.getUserById);
router.post("/users", user_controller_1.default.createUser);
router.put("/users/:id", validations_1.validateIdFormat, user_controller_1.default.updateUser);
router.delete("/users/:id", validations_1.validateIdFormat, user_controller_1.default.deleteUser);
exports.default = router;
