import React, { useState, useEffect, useCallback } from "react";
import { fetchTodos } from "./api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./styles/styles.css"; // Import CSS styles

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", completed: false });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Load Todos with useCallback & Error Handling
  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(`Fetching todos with filter: ${filter}`);
    try {
      const data = await fetchTodos(filter);
      setTodos(data);
      console.log("Todos fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      {/* Filter Buttons */}
      <div className="filters">
        {["all", "pending", "completed"].map((type) => (
          <button
            key={type}
            className={`filter-button ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Create & Edit Todo Form */}
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        loadTodos={loadTodos}
      />

      {/* Loading Indicator */}
      {loading && <p className="loading">Loading...</p>}

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setEditingTodo={setEditingTodo}
            loadTodos={loadTodos}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
