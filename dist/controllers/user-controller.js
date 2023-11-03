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
UserController.getUsers = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_js_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
UserController.getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_js_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
UserController.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newUser = yield user_js_1.default.create(userData);
        res.status(201).json({ message: "User created successfully.", newUser });
    }
    catch (error) {
        next(error);
    }
});
UserController.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = yield user_js_1.default.findOneAndUpdate({ _id: id }, userData, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({ message: "User updated successfully.", updatedUser });
    }
    catch (error) {
        next(error);
    }
});
UserController.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield user_js_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({ message: "User deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
UserController.search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        if (!search) {
            res.status(400).json({ message: "The search parameter is missing or empty." });
            return;
        }
        const users = yield user_js_1.default.find({
            $or: [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { fullName: { $regex: search, $options: "i" } }
            ]
        });
        if (users.length === 0) {
            res.status(404).json({ message: "No user found." });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.default = UserController;
