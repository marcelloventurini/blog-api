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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateAndQuery = void 0;
var Order;
(function (Order) {
    Order["ASC"] = "asc";
    Order["DESC"] = "desc";
})(Order || (Order = {}));
const paginateAndQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 3, sortBy = "_id", order = Order.DESC } = req.query;
        if (page <= 0 || limit <= 0) {
            res.status(400).json({ message: "Invalid format for 'limit' or 'page'." });
            return;
        }
        if (!["_id", "username", "email", "fullName"].includes(sortBy)) {
            res.status(400).json({ message: "Invalid 'sortBy' parameter." });
            return;
        }
        if (order !== Order.ASC && order !== Order.DESC) {
            res.status(400).json({ message: "Invalid 'order' parameter." });
            return;
        }
        const sortOptions = {
            [sortBy]: order === Order.DESC ? -1 : 1
        };
        const result = req.result;
        const queryResult = yield result.find()
            .sort(sortOptions)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        if (queryResult.length === 0) {
            res.status(404).json({ message: "No user found." });
            return;
        }
        res.status(200).json(queryResult);
    }
    catch (error) {
        next(error);
    }
});
exports.paginateAndQuery = paginateAndQuery;
