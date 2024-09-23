import { useState, useEffect } from "react"
import ToDoCard from "./components/ToDoCard"
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"

function App() {

  const [todos, setTodos] = useState([
    'Go to gym',
    'Take shower',
    'Eat fruits'
  ]);

  const [todoValue, setTodoValue] = useState('');

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
    persistData(newTodoList)

  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })

    setTodos(newTodoList)
    persistData(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  // save todos in local storage
  useEffect(() => {
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
    
  }, [])

  return (
    <>
      <ToDoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <ToDoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
    </>
  )
}

export default App
