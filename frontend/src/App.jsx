import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import TodoForm from './components/TodoForm'
import Table from './components/Table'

function App() {

  const [todos, setTodos] = useState("")
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    fetchData()
    console.log(todos);
  }, [])


  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/")
      setTodos(response.data)
      setisLoading(false)

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='bg-indigo-100 px-8 min-h-screen'>
      <nav className='pt-8'>
        <h1 className='test-5xl text-center pb-8'>Todo List</h1>
      </nav>
      <TodoForm
        setTodos={setTodos}
        fetchData={fetchData}
      />
      <Table
        todos={todos}
        setTodos={setTodos}
        isLoading={isLoading}
      />

    </div >
  )
}

export default App
