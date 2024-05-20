import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center">
      <TodoList />
    </main>
  );
}
