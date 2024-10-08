import { useState, useEffect } from "react"
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
    localStorage.setItem('todos2', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    if(!newTodo)
        return alert('Todo cannot be empty.')

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

    if(!valueToBeEdited)
      return alert('Edited Todo cannot be empty.')

    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  // save todos in local storage
  useEffect(() => {
    if(!localStorage){
      return 
    }

    let localTodos = localStorage.getItem('todos2')
    if(!localTodos){
      return;
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
