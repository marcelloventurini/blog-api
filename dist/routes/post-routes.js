"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post-controller"));
const router = express_1.default.Router();
router.get("/posts", post_controller_1.default.getPosts);
router.get("/posts/:id", post_controller_1.default.getPostById);
router.post("/posts", post_controller_1.default.createPost);
router.put("/posts/:id", post_controller_1.default.updatePost);
router.delete("/posts/:id", post_controller_1.default.deletePost);
exports.default = router;
