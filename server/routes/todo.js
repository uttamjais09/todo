import express from 'express';
import { createTodo ,getAllTodos ,updateTodo,deleteTodo } from '../controller/todo.js'
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.route("/").post( isAuthenticated , createTodo).get(getAllTodos);
router.route("/:todoId").put(isAuthenticated,updateTodo).delete(isAuthenticated,deleteTodo);



export default router ;