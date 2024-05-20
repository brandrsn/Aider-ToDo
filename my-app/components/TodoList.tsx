'use client';

import { useState, useRef } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo) {
      if (editingTodoId !== null) {
        setTodos(todos.map((todo) => (todo.id === editingTodoId ? { ...todo, text: trimmedTodo } : todo)));
        setEditingTodoId(null);
      } else {
        setTodos([...todos, { id: Date.now(), text: trimmedTodo }]);
      }
      setNewTodo('');
      setValidationMessage('');
    } else {
      setValidationMessage('Please enter a todo');
    }
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo(todo.text);
      setEditingTodoId(id);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          ref={inputRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={editingTodoId !== null ? 'Edit todo' : 'Add a new todo'}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 mr-2 text-white"
        />
        {validationMessage && <p className="text-red-500 mt-1">{validationMessage}</p>}
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-1">
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-gray-800 p-4 rounded shadow border border-gray-700 cursor-pointer"
            onClick={() => handleEdit(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
