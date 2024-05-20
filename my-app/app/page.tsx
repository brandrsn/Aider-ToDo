"use client"

import { useTheme } from "next-themes"
import TodoList from '../components/TodoList';

export default function Home() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-6 flex flex-col justify-center`}>
      <TodoList theme={theme} toggleTheme={toggleTheme} />
    </main>
  );
}
