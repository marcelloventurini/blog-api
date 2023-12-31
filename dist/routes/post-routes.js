"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post-controller"));
const validations_1 = require("../middlewares/validations");
const pagination_1 = require("../middlewares/pagination");
const router = express_1.default.Router();
router.get("/posts", post_controller_1.default.getPosts, pagination_1.paginateAndQuery);
router.get("/posts/search", post_controller_1.default.search, pagination_1.paginateAndQuery);
router.get("/posts/:id", validations_1.validateIdFormat, post_controller_1.default.getPostById);
router.post("/posts", post_controller_1.default.createPost);
router.put("/posts/:id", validations_1.validateIdFormat, post_controller_1.default.updatePost);
router.delete("/posts/:id", validations_1.validateIdFormat, post_controller_1.default.deletePost);
exports.default = router;
