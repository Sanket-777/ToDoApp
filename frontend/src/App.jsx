import './App.css'
import { CreateTodo } from './components/createTodo'
import { DisplayTodos } from './components/displaytodos'
import { useState, useEffect } from "react"
function App() {

  const [todos, settodos] = useState([]);
  const fetchData = async () => {

    const response = await fetch("http://localhost:3000/todo")
    const parse_response = await response.json()
    console.log("By Fetch");
    console.log(parse_response)

    settodos(parse_response.alltodos)
  }
  useEffect(() => {
    // Define the asynchronous function to fetch data    
    fetchData();
  }, []);


  return (
    <>
      <CreateTodo fetchData={fetchData} />
      <DisplayTodos todos={todos} fetchData={fetchData} />
    </>
  )
}

export default App
