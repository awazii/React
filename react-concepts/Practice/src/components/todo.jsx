import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtodo, removetodo, updatetodo } from '../features/todo/todoSlice'
const TodoList=()=>{
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
     return (
    <div className="max-w-md mx-auto mt-6 space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet ✍️</p>
      ) : (
        todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow rounded-lg px-4 py-2 hover:shadow-md transition"
          >
            <span className="text-gray-800">{todo.text}</span>

            <div className="flex space-x-2">
              <button
              onClick={() => dispatch(updatetodo({id:todo.id,text:"Updated Todo"}))}
                className="text-sm px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
              onClick={() => dispatch(removetodo(todo.id))}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
const Todo = () => {
  const [input, setInput] = React.useState("")
  const dispatch = useDispatch()

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addtodo(input))
          setInput("")
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
      <div>
        <TodoList />
      </div>
    </div>
  )
}

export default Todo

