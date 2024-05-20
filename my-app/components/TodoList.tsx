import { useState, useRef, useEffect } from "react"
import { addTodoItem } from "../actions"
import { motion } from "framer-motion"

const TODOS_KEY = "todos"

export default function TodoList({ theme }) {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(TODOS_KEY)
    return storedTodos ? JSON.parse(storedTodos) : []
  })
  const [newTodo, setNewTodo] = useState("")
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [validationMessage, setValidationMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo) {
      try {
        const formData = new FormData();
        formData.append('todo', trimmedTodo);
        let newTodos;
        if (editingTodoId !== null) {
          newTodos = todos.map((todo) =>
            todo.id === editingTodoId ? { ...todo, text: trimmedTodo } : todo
          );
          setEditingTodoId(null);
        } else {
          const newTodoItem = await addTodoItem(formData);
          newTodos = [...todos, newTodoItem];
        }
        setTodos(newTodos);
        localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
        setNewTodo("");
        setValidationMessage("");
        inputRef.current?.focus();
      } catch (error) {
        console.log("Error adding todo:", error.message);
        setValidationMessage(error.message);
      }
    } else {
      console.log("Validation failed: empty todo");
      setValidationMessage("Please enter a todo");
    }
  };

  const handleEdit = (id) => {
    setEditingTodoId(id);
    setTimeout(() => {
      const input = document.getElementById(`edit-${id}`) as HTMLInputElement;
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }, 0);
  }

  const handleSave = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(updatedTodos));
    setEditingTodoId(null);

    // Focus on the next tabbable item
    const currentIndex = todos.findIndex(todo => todo.id === id);
    const nextTodo = document.querySelectorAll('[tabindex="0"]')[currentIndex + 1] as HTMLElement;
    if (nextTodo) {
      nextTodo.focus();
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className={`max-w-md w-full mt-8 mx-auto ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h1
        className={`text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        } mb-4`}
      >
        Todo List
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
        <div className="flex items-center">
          <input
            type="text"
            ref={inputRef}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e)
              }
            }}
            placeholder={
              editingTodoId !== null ? "Edit todo" : "Add a new todo"
            }
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mr-2 text-gray-900 dark:text-white flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-600 text-white rounded px-4 py-1"
          >
            {editingTodoId !== null ? "Save" : "Add"}
          </button>
        </div>
        {validationMessage && (
          <p className="text-red-500 mt-1">{validationMessage}</p>
        )}
      </form>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-300 dark:border-gray-700"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "e") {
                e.preventDefault();
                handleEdit(todo.id);
              } else if (e.key === "Enter") {
                e.preventDefault();
                const updatedTodos = todos.map((t) =>
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                );
                setTodos(updatedTodos);
                localStorage.setItem(TODOS_KEY, JSON.stringify(updatedTodos));
              }
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {editingTodoId === todo.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  defaultValue={todo.text}
                  id={`edit-${todo.id}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave(todo.id, (e.target as HTMLInputElement).value);
                    }
                  }}
                  onBlur={(e) => handleSave(todo.id, e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 mr-2 text-gray-900 dark:text-white flex-grow"
                />
                <button
                  onClick={() => handleSave(todo.id, inputRef.current?.value || '')}
                  className="bg-blue-500 dark:bg-blue-600 text-white rounded px-4 py-1"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className={`cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
                onClick={() => handleEdit(todo.id)}
              >
                {todo.text}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
