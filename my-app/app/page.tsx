"use client"

import { useTheme } from "next-themes"
import TodoList from "../components/TodoList"

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
            className={`${
              theme === "dark"
                ? "bg-gray-700 text-red-600"
                : "bg-gray-200 text-red-600"
              // } rounded px-4 py-1 ml-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
            } rounded px-4 py-1 ml-4`}
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
          <button
            className={`${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            } rounded px-4 py-1 ml-4`}
            onClick={toggleTheme}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                toggleTheme();
              }
            }}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <TodoList theme={theme} />
      </div>
    </main>
  )
}
