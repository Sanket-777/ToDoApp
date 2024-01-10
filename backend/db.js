const mongoose =  require('mongoose')

mongoose.connect("mongodb+srv://ksanket114402:Sanket@cluster0.nm8azvs.mongodb.net/todo")


const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);


     
module.exports = {
    todo
}