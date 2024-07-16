import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    //this todo we will get from the form input
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    //so what this function is doing
    //it is updating the state of todos
    //by adding new value with prev one
    //so what it does like
    //eg : const nums = [1, 2, 3]
    // const new_arr = [...nums, 4, 5] => [1, 2, 3, 4, 5]
    // ... spread operator
    // (prev) => [todo, ...prev]
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? {
              ...prevTodo,
              checked: !prevTodo.checked,
            }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); //parse directly gives javascript

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
