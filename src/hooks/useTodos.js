import { useState, useEffect, useCallback } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api";

const useTodos = (roomCode) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  console.log("🛠️ useTodos Hook Initialized");
  console.log("📌 Room Code:", roomCode);

  // ✅ Load Todos
  const loadTodos = useCallback(async () => {
    try {
      console.log("📡 Fetching todos for room:", roomCode);
      const fetchedTodos = await fetchTodos(roomCode);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
    }
  }, [roomCode]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // ✅ Create a new todo
  const handleCreateTodo = async () => {
    if (!newTodo.title.trim()) {
      console.error("❌ Cannot create an empty todo!");
      return;
    }

    try {
      console.log("🚀 Creating new todo...");
      await createTodo(roomCode, newTodo);
      setNewTodo({ title: "", description: "" }); // Reset input
      loadTodos();
    } catch (error) {
      console.error("❌ Error creating todo:", error);
    }
  };

  // ✅ Update a todo
  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    try {
      console.log("🚀 Updating todo...");
      await updateTodo(roomCode, id, { title: updatedTitle, description: updatedDescription });
      setEditingTodo(null);
      loadTodos();
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };

  // ✅ Delete a task
  const handleDeleteTodo = async (id) => {
    try {
      console.log("🗑️ Deleting todo...");
      await deleteTodo(roomCode, id);
      loadTodos();
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
    }
  };

  // ✅ Apply Filtering
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return false; // No completed or pending filtering anymore
  });

  return {
    todos: filteredTodos,  // ✅ Return filtered list
    newTodo,
    editingTodo,
    filter,
    setNewTodo,
    setEditingTodo,
    setFilter,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useTodos;
