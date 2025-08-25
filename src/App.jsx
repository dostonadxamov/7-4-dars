import { useDispatch, useSelector } from "react-redux"
import { addTodo, editTodo, removeTodo } from "./app/features/counterSlice"
import { useState } from "react";


export default function App() {
  const { todos } = useSelector((store) => store.todos)
  const dispatch = useDispatch()
  console.log(todos);
  const [_title, setTitle] = useState('')
  const [_completed, setCompleted] = useState('')
  const [id, setId] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get("title")
    const completed = formData.get("completed") != null

    if (_title) {
      dispatch(editTodo({
        id,
        title,
        completed
      }))
    } else {
      dispatch(
        addTodo({
          id: Math.random(),
          title,
          completed
        }))
      e.target.reset()
    }
  }

  function handleEdit(todo) {
    setCompleted(todo.completed)
    setTitle(todo.title)
    setId(todo.id)
  }

  return (
    <div>
      <h1>ToDo List Crud</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input defaultValue={_title} name="title" type="text" />
        </div>
        <div>
          <label>completed</label>
          <input name="completed" defaultChecked={_completed} type="checkbox" />
          <br />
          <button>add</button>
        </div>
      </form>
      <ul>
        {todos && todos.map(todo => (
          <li key={todo.id}>
            <h4 style={{ opacity: todo.completed && '0.1' }}>
              {todo.title}
            </h4>
            <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
            <button onClick={() => handleEdit(todo)}>edit</button>
          </li>
        ))}
      </ul>


    </div>
  )
}
