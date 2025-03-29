import Todos from "../model/todoModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  console.log(req.body);
  let todo = await Todos.create({
    title: req.body.title,
    description: req.body.description,
    userId : req.body.userId
  });

  res.json(todo);
});

const getTodo = asyncHandler(async (req, res) => {
  let todos = await Todos.find({ userId : req.query.userId});
  res.json(todos);
});

const deleteTodo = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  await Todos.findByIdAndDelete(req.params.id);

  res.status(200).send("deleted");
});

const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let getTodo = await Todos.findById(id);

  if (!getTodo) {
    return res.status(404).send("Todo not found");
  }
  res.status(200).json(getTodo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, status, id } = req.body;
  let updateTodo = await Todos.findByIdAndUpdate(id, {
    title,
    description,
    status,
  });
  if (!updateTodo) {
    return res.status(404).send("Todo not found");
  }
  res.status(200).json(updateTodo);
});

export { createTodo, getTodo, deleteTodo, getTodoById, updateTodo };
