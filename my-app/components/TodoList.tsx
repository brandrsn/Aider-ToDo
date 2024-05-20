'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const TODOS_KEY = 'todos';

export default function TodoList() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>(() => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo) {
      if (editingTodoId !== null) {
        console.log('Editing todo with id:', editingTodoId);
        const updatedTodos = todos.map((todo) => (todo.id === editingTodoId ? { ...todo, text: trimmedTodo } : todo));
        setTodos(updatedTodos);
        localStorage.setItem(TODOS_KEY, JSON.stringify(updatedTodos));
        setEditingTodoId(null);
      } else {
        console.log('Adding new todo:', trimmedTodo);
        const newTodos = [...todos, { id: Date.now(), text: trimmedTodo, completed: false }];
        setTodos(newTodos);
        localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
      }
      setNewTodo('');
      setValidationMessage('');
      inputRef.current?.focus();
    } else {
      console.log('Validation failed: empty todo');
      setValidationMessage('Please enter a todo');
    }
  };

  const handleEdit = (id: number) => {
    console.log('Editing todo with id:', id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo(todo.text);
      setEditingTodoId(id);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Todo List</h1>
        <button
          className="bg-gray-700 text-white rounded px-4 py-1"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
        <div className="flex items-center">
          <input
            type="text"
            ref={inputRef}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e as any);
              }
            }}
            placeholder={editingTodoId !== null ? 'Edit todo' : 'Add a new todo'}
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 mr-2 text-white flex-grow"
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-1">
            {editingTodoId !== null ? 'Save' : 'Add'}
          </button>
        </div>
        {validationMessage && <p className="text-red-500 mt-1">{validationMessage}</p>}
      </form>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`bg-gray-800 p-4 rounded shadow border border-gray-700 cursor-pointer ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'e') {
                e.preventDefault();
                console.log('Editing todo with "e" key, id:', todo.id);
                handleEdit(todo.id);
              } else if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Toggling todo completion with "Enter" key, id:', todo.id);
                const updatedTodos = todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t));
                setTodos(updatedTodos);
                localStorage.setItem(TODOS_KEY, JSON.stringify(updatedTodos));
              }
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
