import todo from "../models/todo.js"
export const createTodo = async (req,res) => {
    try {
        const {title,description} = req.body ;
        if(!title || !description){
            return res.status(403).json({
                success:false,
                message: "All field are required"
            });

        }
        await  todo.create({
            title ,
            description
        });
        return res.status(201).json({
            success:true ,
            message: "todo created",
            todo

        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
        
    }
};
export const getAllTodos = async (req,res)=>{
    try {
        const todos = await todo.find();
        console.log(todos);
        return res.status(200).json({
            success:true,
            todos
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { title } = req.body;
        const updatedTodo = await todo.findByIdAndUpdate(todoId, { title }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
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
export const deleteTodo = async (req,res)=>{
    try {
        const todoId = req.params.todoId;
        await todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            success:true,
            message:"todo deleted successfully"
        })

        
    } catch (error) {
        console.log(error);
        
    }
}


