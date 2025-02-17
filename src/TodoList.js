import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchTodos,
  createTodo,
  completeTodo,
  deleteTodo,
} from './api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState("all");

  // ✅ Fix: Define loadTodos BEFORE useEffect & use useCallback
  const loadTodos = useCallback(async () => {
    const data = await fetchTodos(filter);
    setTodos(data);
  }, [filter]); // ✅ Now filter is a dependency

  // ✅ Fix: Use loadTodos in useEffect (with useCallback)
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title) return;
    await createTodo({ ...newTodo, completed: false });
    setNewTodo({ title: '', description: '' });
    loadTodos();
  };

  const handleCompleteTodo = async (id) => {
    await completeTodo(id);
    loadTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>To-Do List</h1>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Create Todo Form */}
      <form onSubmit={handleCreateTodo} style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>

      {/* Display Todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0", listStyle: "none" }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.completed ? "✅ Completed" : "❌ Pending"}</p>
            {!todo.completed && (
              <button onClick={() => handleCompleteTodo(todo.id)}>Mark as Completed</button>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
