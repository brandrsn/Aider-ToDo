"use client"

import { useTheme } from "next-themes"
import TodoList from "../components/TodoList"
import { clearAllTodos } from "../actions"

const TODOS_KEY = "todos"

export default function Home() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const clearTodos = () => {
    localStorage.removeItem(TODOS_KEY)
    window.location.reload()
  }

  return (
    <main
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } py-6`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={clearTodos}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                clearTodos()
              }
            }}
          >
            Clear All Todos
          </button>
        </div>
        <TodoList theme={theme} toggleTheme={toggleTheme} />
      </div>
    </main>
  )
}
