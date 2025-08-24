import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "./app/features/counterSlice"


export default function App() {
  const { todos } = useSelector((store) => store.todos)
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get("title")
    const completed = formData.get("completed")
    dispatch(addTodo({
      id:Math.random(),
      title,
      completed
    }))
    e.target.reset()
  }

  return (
    <div>
      {/* <h1>ToDo List Crud</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input name="title" type="text" />
        </div>
        <div>
          <label>completed</label>
          <input name="compeleted" type="checkbox" />
          <br />
          <button>add</button>
        </div>
      </form> */}
    </div>
  )
}
