const { Router } = require('express')
const Todo = require('../../models/todoSchema')
const router = Router()
router.get('/', async (req, res) => {
     try {
        const todoList = await Todo.find()
        if (!todoList) throw new Error('No Todo List found')
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    try {
        const todo = await newTodo.save()
        if (!todo) {
            return res.status(500).json({ message: 'Something went wrong saving the Todo' })
        }
        res.status(200).json(todo)
    } catch (error) {
        console.error('Error saving todo:', error)
        res.status(500).json({ message: 'eror encounter in the backend' })
    }
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const removed = await Todo.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//  update the todos 
router.patch('/:id', async(req, res)=>{
    const id = req.params.id;
    const updatedTodo = {title: req.body.title, description: req.body.description}
    console.log("server side ", updatedTodo)
   try{
    const update = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true })
    if(!update) throw Error("Not update successfully");
    res.status(200).json(update);
   }
   catch(error){
    res.status(500).json({message: error.message});
    console.log("request in server here is ==>", req)
   }
})
//Delete All todos
router.delete('/', async (req, res) => {
    try {
      
      await Todo.deleteMany({});
      
      res.status(204).json({ message: 'All todos deleted successfully' });
    } catch (error) {
      console.error('Error deleting all todos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router