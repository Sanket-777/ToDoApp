const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const  cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());
console.log("Server is Up");

// to get all the todos
app.get("/todo", async function (req, res) {
  const alltodos = await todo.find();

  res.send({
    alltodos
  });
 
});

//to add to do
app.post("/todos", async function (req, res) {
  const getbody = req.body;
  console.log(req.body);
  const chktodo = createTodo.safeParse(getbody);

  if (!chktodo.success) {
    res.status(411).json({
      msg: "Wrong Inputs !",
    });
  }

  //put in db
  let complete = false;
  await todo.create({
    title: getbody.title,
    description: getbody.description,
    completed: complete,
  });

  res.send({
    msg: "ToDos Added successfully !",
  });
});

// to mark the todo as completed
app.put("/complete", async function (req, res) {
  const getbody = req.body;
  const checksyntax = updateTodo.safeParse(getbody);

  if (!checksyntax.success) {
    res.status(411).json({
      msg: "Not proper id is given ",
    });
  }

  await todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.json({
    msg: "Updated Successfully",
  });
});

// to delete todo
app.delete("/delete", async function (req, res) {
  const todoId = req.body.id;

  try {
    await todo.deleteOne({ _id: todoId });
    res.json({
      msg: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting todo",
    });
  }
});


app.listen(3000);
