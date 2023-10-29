"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("../models/user.js"));
class UserController {
}
_a = UserController;
UserController.getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_js_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get users.", error });
    }
});
UserController.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_js_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get user.", error });
    }
});
UserController.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newUser = yield user_js_1.default.create(userData);
        res.status(201).json({ message: "User created successfully.", newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create user.", error });
    }
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = yield user_js_1.default.findByIdAndUpdate(id, userData, { new: true });
        res.status(200).json({ message: "User updated successfully.", updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update user.", error });
    }
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield user_js_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete user." });
    }
});
exports.default = UserController;