import express from "express";
import { createTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todoController.js";
import protect from '../middleware/authMiddelware.js'

const todoRoute = express.Router();


todoRoute.post("/createTodo",protect, createTodo);

todoRoute.get("/getTodos",protect, getTodo );

todoRoute.get("/getTodoById",protect, getTodoById);

todoRoute.patch("/updateTodo",protect, updateTodo)

todoRoute.delete("/:id",protect, deleteTodo);


export default todoRoute;
