import Todo from "../models/todo.js"

export const createTodo = async (req, res) => {
    try {
        
        

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newTodo = await Todo.create({
            title,
            description,
            user: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Todo created",
            todo: newTodo
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

    
export const getAllTodos = async (req, res) => {
    try {
        
        const todos = await Todo.find({ user: req.user._id });  // Filter by authenticated user's ID
        console.log("Todos fetched:", todos);
        return res.status(200).json({
            success: true,
            todos
        });
    } catch (error) {
        console.log("Error fetching todos:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

    export const updateTodo = async (req, res) => {
        try {
            const todoId = req.params.todoId;
            const { title , description } = req.body;
            
    
            // Find the todo and ensure it belongs to the authenticated user
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: todoId, user: req.user._id },
                { title , description },
                
                { new: true }
            );
    
            if (!updatedTodo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found or not authorized"
                });
            }
    
            return res.status(200).json({
                success: true,
                todo: updatedTodo,
                message: "Todo updated."
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    };
    
export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        // Find the todo and ensure it belongs to the authenticated user
        const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user: req.user._id });

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};



