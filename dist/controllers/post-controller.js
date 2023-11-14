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
const post_1 = __importDefault(require("../models/post"));
class PostController {
}
_a = PostController;
PostController.getPosts = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
PostController.getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postById = yield post_1.default.findById(id);
        if (!postById) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json(postById);
    }
    catch (error) {
        next(error);
    }
});
PostController.createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = req.body;
        const newPost = yield post_1.default.create(postData);
        res.status(201).json({ message: "Post created successfully.", newPost });
    }
    catch (error) {
        next(error);
    }
});
PostController.updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postData = req.body;
        const updatedPost = yield post_1.default.findOneAndUpdate({ _id: id }, postData, { new: true, runValidators: true });
        if (!updatedPost) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json({ message: "Post updated successfully.", updatedPost });
    }
    catch (error) {
        next(error);
    }
});
PostController.deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPost = yield post_1.default.findByIdAndDelete(id);
        if (!deletedPost) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
PostController.search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        if (!search) {
            res.status(404).json({ message: "The search parameter is missing or empty." });
            return;
        }
        const posts = yield post_1.default.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        });
        if (posts.length === 0) {
            res.status(404).json({ message: "Post not found." });
            return;
        }
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = PostController;
