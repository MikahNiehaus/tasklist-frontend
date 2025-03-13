import { useState, useEffect, useCallback } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from "../api";

const useTodos = (roomCode) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  console.log("useTodos Hook Initialized");
  console.log("Room Code:", roomCode);

  // Load todos from the server
  const loadTodos = useCallback(async () => {
    try {
      console.log("Fetching todos for room:", roomCode);
      const fetchedTodos = await fetchTodos(roomCode);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [roomCode]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Create a new todo
  const handleCreateTodo = async () => {
    if (!newTodo.title.trim()) {
      console.error("Cannot create an empty todo!");
      return;
    }

    try {
      console.log("Creating new todo...");
      await createTodo(roomCode, newTodo);
      setNewTodo({ title: "", description: "" });
      loadTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Update an existing todo
  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    try {
      console.log("Updating todo...");
      await updateTodo(roomCode, id, { title: updatedTitle, description: updatedDescription });
      setEditingTodo(null);
      loadTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Toggle the completion status of a todo
  const handleToggleStatus = async (id) => {
    try {
      console.log("Toggling todo status...");
      await toggleTodo(roomCode, id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      console.log("Deleting todo...");
      await deleteTodo(roomCode, id);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Apply filtering to todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    newTodo,
    editingTodo,
    filter,
    setNewTodo,
    setEditingTodo,
    setFilter,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleStatus,
    handleDeleteTodo,
  };
};

export default useTodos;
