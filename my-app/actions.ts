'use server'

export async function addTodoItem(formData: FormData) {
  const newTodo = formData.get('todo')?.toString().trim();
  if (newTodo) {
    return { id: Date.now(), text: newTodo, completed: false };
  } else {
    throw new Error('Todo item cannot be empty');
  }
}
export async function clearAllTodos() {
  // This function can be used to perform any server-side operations if needed
  return [];
}
