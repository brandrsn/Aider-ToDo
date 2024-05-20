'use client';

import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 mr-2 text-white"
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-1">
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded shadow">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}
