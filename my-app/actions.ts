'use server'

export async function addTodoItem(formData: FormData) {
  const newTodo = formData.get('todo')?.toString().trim();
  if (newTodo) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return newTodos;
  } else {
    throw new Error('Todo item cannot be empty');
  }
}
