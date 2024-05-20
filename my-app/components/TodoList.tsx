'use client';

import { useState, useRef, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
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
        setTodos(todos.map((todo) => (todo.id === editingTodoId ? { ...todo, text: trimmedTodo } : todo)));
        setEditingTodoId(null);
      } else {
        console.log('Adding new todo:', trimmedTodo);
        setTodos([...todos, { id: Date.now(), text: trimmedTodo, completed: false }]);
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
      <h1 className="text-2xl font-bold mb-4 text-white">Todo List</h1>
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
              if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Editing todo with Enter key, id:', todo.id);
                handleEdit(todo.id);
              } else if (e.key === 'Delete') {
                e.preventDefault();
                console.log('Toggling todo completion with Delete key, id:', todo.id);
                setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
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
