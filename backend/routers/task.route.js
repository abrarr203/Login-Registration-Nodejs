import e, { Router } from "express";

import { createTask, deleteTask, getTasks, getTaskById, updateTask } from "../controllers/task.controller.js";

const taskRouter = Router({mergeParams: true});

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;