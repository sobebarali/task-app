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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.deleteTodo = exports.updateTodoNotDone = exports.updateTodoDone = exports.addTodo = exports.getTodos = void 0;
const task_1 = __importDefault(require("../models/task"));
const verifyAndExtractUserId_1 = require("../helpers/verifyAndExtractUserId");
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const info = req.body;
        const todo = new task_1.default({
            userId,
            title: info.title,
        });
        const newTodo = yield todo.save();
        return res.status(201).send({
            data: {
                success: true,
                todo: newTodo,
            },
            error: null,
        });
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While adding a task",
        });
    }
});
exports.addTodo = addTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const todos = yield task_1.default.find({ userId });
        res.status(200).send({ todos });
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While getting all the tasks",
        });
    }
});
exports.getTodos = getTodos;
const updateTodoDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const updateTodo = yield task_1.default.findOneAndUpdate({ _id: id, userId }, { status: true }, { new: true });
        res.status(200).json({ message: "Todo updated", todo: updateTodo });
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While updating a task to done",
        });
    }
});
exports.updateTodoDone = updateTodoDone;
const updateTodoNotDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const updateTodo = yield task_1.default.findOneAndUpdate({ _id: id, userId }, { status: false }, { new: true });
        res.status(200).json({ message: "Todo updated", todo: updateTodo });
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While updating a task undone",
        });
    }
});
exports.updateTodoNotDone = updateTodoNotDone;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const deletedTodo = yield task_1.default.findOneAndRemove({
            _id: req.params.id,
            userId,
        });
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
        });
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While deleting a task",
        });
    }
});
exports.deleteTodo = deleteTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
        const info = yield task_1.default.findOne({ _id: req.params.id, userId });
        if (!info)
            return res.status(404).json({ message: "Todo not found" });
        res.status(200).json(info);
    }
    catch (error) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While getting a task",
        });
    }
});
exports.getTodo = getTodo;
