import taskModel from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; 

        const newTask = await taskModel.create({
            title,
            description,
            user: userId
        });

        res.status(201).json({
            success: true,
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findOne({ _id: id, user: req.user.id });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;    
        const task = await taskModel.findOne({ _id: id, user: req.user.id });

        if (!task) {        
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        task.title = title || task.title;
        task.description = description || task.description; 
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();                 
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findOneAndDelete({ _id: id, user: req.user.id });

        if (!task) {        
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
